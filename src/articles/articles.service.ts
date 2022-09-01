import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/boards.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    private readonly boardsService: BoardsService,
  ) {}

  async findAll(boardSlug?: string): Promise<Article[]> {
    const articles = await this.articlesRepository.find({
      where: { board: { slug: boardSlug } },
      relations: { author: true },
    });
    return articles;
  }

  async findById(id: number): Promise<Article | undefined> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: { author: true, comments: { author: true }, board: true },
    });
    return article;
  }

  async create(
    user: User,
    dto: CreateArticleDto,
    boardSlug?: string,
  ): Promise<Article> {
    const article = new Article();
    article.title = dto.title;
    article.content = dto.content;
    article.author = user;

    if (boardSlug) {
      const board = await this.boardsService.findBySlug(boardSlug);
      article.board = board;
    }

    return await this.articlesRepository.save(article);
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article> {
    const article = await this.findById(id);
    article.title = dto.title;
    article.content = dto.content;

    return this.articlesRepository.save(article);
  }

  async delete(id: number) {
    await this.articlesRepository.softDelete(id);
  }
}
