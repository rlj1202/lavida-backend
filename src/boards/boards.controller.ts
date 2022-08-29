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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateBoardDto) {
    return await this.boardsService.create(dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Patch(':slug')
  async update(@Param('slug') slug: string, @Body() dto: UpdateBoardDto) {
    return await this.boardsService.update(slug, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    await this.boardsService.deleteBySlug(slug);
  }

  // XXX:
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Post('ping')
  async ping() {
    return 'Success';
  }
}
