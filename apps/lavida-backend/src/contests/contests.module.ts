import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contest])],
  providers: [ContestsService],
  controllers: [ContestsController],
  exports: [ContestsService],
})
export class ContestsModule {}
