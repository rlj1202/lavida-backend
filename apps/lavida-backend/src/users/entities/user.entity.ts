import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from '../../../src/roles/entities/role.entity';
import { Submission } from '../../../src/submissions/entities/submission.entity';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column({ nullable: true })
  @Exclude()
  refreshTokenHash?: string;

  @ApiProperty()
  @Column({ unique: true })
  @Exclude()
  email: string;

  @OneToMany(() => Submission, (subsmission) => subsmission.user)
  submissions: Submission[];

  @ApiProperty({ type: () => Role })
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  public isAdmin(): boolean {
    return this.roles.map((role) => role.name).includes('admin');
  }
}
