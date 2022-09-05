import { ApiProperty } from '@nestjs/swagger';
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

@Entity('problem')
export class Problem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  author: User;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  inputDesc: string;

  @ApiProperty()
  @Column()
  outputDesc: string;

  // TODO:
  tags: string[];

  /** In milli seconds */
  @ApiProperty({ description: 'In milli seconds' })
  @Column()
  timeLimit: number;

  /** In bytes */
  @ApiProperty({ description: 'In bytes' })
  @Column()
  memoryLimit: number;

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
