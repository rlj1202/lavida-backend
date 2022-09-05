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

@Entity('workbook')
export class Workbook {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  /** Who created the workbook. */
  @ApiProperty({
    type: () => User,
    description: 'The one who created the workbook.',
  })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ type: [() => Problem] })
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
