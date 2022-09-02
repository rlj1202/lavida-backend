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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UseAbility from 'src/casl/ability.decorator';
import { Action } from 'src/casl/casl.enum';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOkResponse({ type: () => Comment, isArray: true })
  @Get()
  async findAll(@Query('article') articleId: number) {
    const comments = await this.commentsService.findAll(articleId);
    return comments;
  }

  @ApiOkResponse({ type: () => Comment })
  @Get(':id')
  async find(@Param('id') id: number) {
    const comment = await this.commentsService.findById(id);
    return comment;
  }

  @ApiCreatedResponse({ type: () => Comment })
  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Comment)
  async create(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Query('article') articleId: number,
  ) {
    const comment = await this.commentsService.create(user, dto, articleId);
    return comment;
  }

  @ApiOkResponse({ type: () => Comment })
  @Patch(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Update, Comment, CommentsService, ({ params }, service) =>
    service.findById(parseInt(params.id)),
  )
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentsService.update(id, dto);
    return comment;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Delete, Comment, CommentsService, ({ params }, service) =>
    service.findById(parseInt(params.id)),
  )
  async delete(@Param('id') id: number) {
    await this.commentsService.delete(id);
  }
}
