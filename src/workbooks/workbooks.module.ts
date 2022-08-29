import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entities/workbook.entity';
import { WorkbooksController } from './workbooks.controller';
import { WorkbooksService } from './workbooks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workbook])],
  controllers: [WorkbooksController],
  providers: [WorkbooksService],
})
export class WorkbooksModule {}
