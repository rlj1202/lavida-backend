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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UseAbility from 'src/casl/ability.decorator';
import { Action } from 'src/casl/casl.enum';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOkResponse({ type: () => Board, isArray: true })
  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @ApiOkResponse({ type: () => Board })
  @Get(':slug')
  async find(@Param('slug') slug: string) {
    const board = await this.boardsService.findBySlug(slug);
    if (!board) throw new NotFoundException();
    return board;
  }

  @ApiCreatedResponse({ type: () => Board })
  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Board)
  async create(@Body() dto: CreateBoardDto) {
    return await this.boardsService.create(dto);
  }

  @ApiOkResponse({ type: () => Board })
  @Patch(':slug')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Update, Board, BoardsService, (req, service) =>
    service.findBySlug(req.params.slug),
  )
  async update(@Param('slug') slug: string, @Body() dto: UpdateBoardDto) {
    return await this.boardsService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Delete, Board, BoardsService, (req, service) =>
    service.findBySlug(req.params.slug),
  )
  async delete(@Param('slug') slug: string) {
    await this.boardsService.deleteBySlug(slug);
  }
}
