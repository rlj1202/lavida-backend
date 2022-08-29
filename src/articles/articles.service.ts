import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async findById(id: number): Promise<Article | undefined> {
    const article = await this.articlesRepository.findOne({ where: { id } });
    return article;
  }

  async create(dto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = dto.title;
    article.content = dto.content;
    // TODO:
    article.board;
    article.author;

    return await this.articlesRepository.save(article);
  }
}
