import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from 'src/problems/problems.module';
import { Submission } from './entities/submission.entity';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Submission]), ProblemsModule],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
