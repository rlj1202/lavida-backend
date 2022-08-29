import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workbook')
export class Workbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  /** Who created the workbook. */
  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Problem)
  @JoinTable()
  problems: Problem[];
}
