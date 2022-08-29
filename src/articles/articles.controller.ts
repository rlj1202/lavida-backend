import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const article = await this.articlesService.findById(id);
    return article;
  }
}
