import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from 'src/problems/problems.module';
import { Submission } from './entities/submission.entity';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Submission]), ProblemsModule],
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
})
export class SubmissionsModule {}
