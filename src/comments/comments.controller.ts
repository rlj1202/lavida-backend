import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Query('article') articleId: number) {
    const comments = await this.commentsService.findAll(articleId);
    return comments;
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const comment = await this.commentsService.findById(id);
    return comment;
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Query('article') articleId: number,
  ) {
    const comment = await this.commentsService.create(user, dto, articleId);
    return comment;
  }
}
