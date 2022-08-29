import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { Submission } from 'src/submissions/entities/submission.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column({ nullable: true })
  @Exclude()
  refreshTokenHash?: string;

  @OneToMany(() => Submission, (subsmission) => subsmission.user)
  submissions: Submission[];

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
