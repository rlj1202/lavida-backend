import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from '../../../src/articles/entities/article.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  author: User;

  @ApiProperty()
  @Column()
  articleId: number;

  @ApiPropertyOptional({ type: () => Article })
  @ManyToOne(() => Article)
  article: Article;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
