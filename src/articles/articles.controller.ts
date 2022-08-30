import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query('board') boardSlug: string) {
    const articles = await this.articlesService.findAll(boardSlug);
    return articles;
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const article = await this.articlesService.findById(id);
    return article;
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() dto: CreateArticleDto,
    @GetUser() user: User,
    @Query('board') boardSlug: string,
  ) {
    try {
      const article = await this.articlesService.create(user, dto, boardSlug);
      return article;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
