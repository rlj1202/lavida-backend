import { Controller, Get, Param } from '@nestjs/common';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/casl.enum';
import CheckPolicies from 'src/casl/policies.decorator';
import { Problem } from './entities/problem.entity';
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
