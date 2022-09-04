import { Module } from '@nestjs/common';
import { JudgeController } from './judge.controller';
import { JudgeService } from './judge.service';

@Module({
  imports: [],
  controllers: [JudgeController],
  providers: [JudgeService],
})
export class JudgeModule {}
