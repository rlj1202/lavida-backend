import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../../src/auth/guards/jwt.guard';
import UseAbility from '../../src/casl/ability.decorator';
import { Action } from '../../src/casl/casl.enum';
import { PoliciesGuard } from '../../src/casl/policies.guard';
import { User } from '../../src/users/entities/user.entity';
import { GetUser } from '../../src/users/user.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOkResponse({ type: [Article] })
  @Get()
  async findAll(@Query('board') boardSlug: string) {
    const articles = await this.articlesService.findAll(boardSlug);
    return articles;
  }

  @ApiOkResponse({ type: Article })
  @Get(':id')
  async find(@Param('id') id: number) {
    const article = await this.articlesService.findById(id);
    return article;
  }

  @ApiBody({ type: CreateArticleDto })
  @ApiQuery({ name: 'board', type: 'string' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Article,
  })
  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Article)
  async create(
    @Body() dto: CreateArticleDto,
    @GetUser() user: User,
    @Query('board') boardSlug: string,
  ): Promise<Article> {
    try {
      const article = await this.articlesService.create(user, dto, boardSlug);
      return article;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({ type: Article })
  @Patch(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Update, Article, ArticlesService, (req, service) =>
    service.findById(parseInt(req.params.id)),
  )
  async update(@Param('id') id: number, @Body() dto: UpdateArticleDto) {
    const article = await this.articlesService.update(id, dto);
    return article;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Delete, Article, ArticlesService, (req, service) =>
    service.findById(parseInt(req.params.id)),
  )
  async delete(@Param('id') id: number) {
    await this.articlesService.delete(id);
  }
}
