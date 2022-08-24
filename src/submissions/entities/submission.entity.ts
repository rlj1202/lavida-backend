import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem)
  problem: Problem;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.WAITING,
  })
  status: SubmissionStatus;

  @Column({ default: 0 })
  memory: number;

  @Column({ default: 0 })
  time: number;

  @Column()
  language: string;

  @Column()
  codeLength: number;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;
}
