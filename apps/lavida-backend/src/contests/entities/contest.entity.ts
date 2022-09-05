import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../../../src/problems/entities/problem.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contest')
export class Contest {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  startAt: Date;

  @ApiProperty()
  @Column()
  endAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  moderator: User;

  @ManyToMany(() => Problem)
  @JoinTable()
  problems: Problem[];

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
