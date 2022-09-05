import { ApiProperty } from '@nestjs/swagger';
import { Board } from '../../../src/boards/entities/board.entity';
import { Comment } from '../../../src/comments/entities/comment.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  author: User;

  @ApiProperty({ type: () => Board })
  @ManyToOne(() => Board, (board) => board.articles)
  board: Board;

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ApiProperty()
  @Column({ default: 0 })
  likes: number;

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
