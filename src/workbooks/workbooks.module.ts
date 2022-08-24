import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entities/workbook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workbook])],
})
export class WorkbooksModule {}
