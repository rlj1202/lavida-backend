import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async findById(id: number): Promise<Board | undefined> {
    const board = await this.boardsRepository.findOne({ where: { id } });
    return board;
  }

  async findBySlug(slug: string): Promise<Board | undefined> {
    const board = await this.boardsRepository.findOne({ where: { slug } });
    return board;
  }

  async create(dto: CreateBoardDto): Promise<Board> {
    const board = new Board();
    board.slug = dto.slug;
    board.title = dto.title;
    board.description = dto.description;

    return await this.boardsRepository.save(board);
  }

  async update(slug: string, dto: UpdateBoardDto): Promise<Board> {
    const board = await this.findBySlug(slug);
    board.title = dto.title;
    board.description = dto.description;

    return this.boardsRepository.save(board);
  }

  async deleteBySlug(slug: string) {
    await this.boardsRepository.softDelete({ slug });
  }
}
