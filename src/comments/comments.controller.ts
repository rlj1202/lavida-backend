import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/casl.enum';
import CheckPolicies from 'src/casl/policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Query('article') articleId: number) {
    const comments = await this.commentsService.findAll(articleId);
    return comments;
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const comment = await this.commentsService.findById(id);
    return comment;
  }

  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(async (ability: AppAbility) =>
    ability.can(Action.Create, Comment),
  )
  async create(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Query('article') articleId: number,
  ) {
    const comment = await this.commentsService.create(user, dto, articleId);
    return comment;
  }

  @Patch(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(
    async (ability: AppAbility, request: Request, moduleRef: ModuleRef) =>
      ability.can(
        Action.Update,
        await moduleRef
          .get(CommentsService)
          .findById(parseInt(request.params.id)),
      ),
  )
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentsService.update(id, dto);
    return comment;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(
    async (ability: AppAbility, request: Request, moduleRef: ModuleRef) =>
      ability.can(
        Action.Delete,
        await moduleRef
          .get(CommentsService)
          .findById(parseInt(request.params.id)),
      ),
  )
  async delete(@Param('id') id: number) {
    await this.commentsService.delete(id);
  }
}
