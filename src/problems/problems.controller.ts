import { Controller, Get, Param } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const problem = await this.problemsService.findById(id);
    return problem;
  }
}
