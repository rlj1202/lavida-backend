import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly articlesService: ArticlesService,
  ) {}

  async findAll(articleId?: number): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { article: { id: articleId } },
    });
  }

  async findById(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new Error('No such comment');
    }
    return comment;
  }

  async create(
    user: User,
    dto: CreateCommentDto,
    articleId: number,
  ): Promise<Comment> {
    const article = await this.articlesService.findById(articleId);

    const comment = new Comment();
    comment.author = user;
    comment.content = dto.content;
    comment.article = article;

    return this.commentsRepository.save(comment);
  }
}
