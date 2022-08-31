import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/casl.enum';
import CheckPolicies from 'src/casl/policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':slug')
  async find(@Param('slug') slug: string) {
    const board = await this.boardsService.findBySlug(slug);
    if (!board) throw new NotFoundException();
    return board;
  }

  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(async (ability: AppAbility) =>
    ability.can(Action.Create, Board),
  )
  async create(@Body() dto: CreateBoardDto) {
    return await this.boardsService.create(dto);
  }

  @Patch(':slug')
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(
    async (ability: AppAbility, request: Request, moduleRef: ModuleRef) =>
      ability.can(
        Action.Update,
        await moduleRef.get(BoardsService).findBySlug(request.params.slug),
      ),
  )
  async update(@Param('slug') slug: string, @Body() dto: UpdateBoardDto) {
    return await this.boardsService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies(
    async (ability: AppAbility, request: Request, moduleRef: ModuleRef) =>
      ability.can(
        Action.Delete,
        await moduleRef.get(BoardsService).findBySlug(request.params.slug),
      ),
  )
  async delete(@Param('slug') slug: string) {
    await this.boardsService.deleteBySlug(slug);
  }

  // XXX:
  @Post('ping')
  @UseGuards(JwtGuard, PoliciesGuard)
  async ping() {
    return 'Success';
  }
}
