import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../../../src/problems/entities/problem.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionStatus } from '../submissions.enums';

@Entity('submission')
export class Submission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem)
  problem: Problem;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ enum: SubmissionStatus })
  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.WAITING,
  })
  status: SubmissionStatus;

  @ApiProperty()
  @Column({ default: 0 })
  memory: number;

  @ApiProperty()
  @Column({ default: 0 })
  time: number;

  @ApiProperty()
  @Column()
  language: string;

  @ApiProperty()
  @Column()
  codeLength: number;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
