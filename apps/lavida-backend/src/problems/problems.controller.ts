import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../src/auth/guards/jwt.guard';
import UseAbility from '../../src/casl/ability.decorator';
import { Action } from '../../src/casl/casl.enum';
import { PoliciesGuard } from '../../src/casl/policies.guard';
import { User } from '../../src/users/entities/user.entity';
import { GetUser } from '../../src/users/user.decorator';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem } from './entities/problem.entity';
import { ProblemsService } from './problems.service';

@ApiTags('problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @ApiOkResponse({ type: () => Problem, isArray: true })
  @Get()
  async findAll() {
    const problems = await this.problemsService.findAll();
    return problems;
  }

  @ApiOkResponse({ type: () => Problem })
  @Get(':id')
  async find(@Param('id') id: number) {
    const problem = await this.problemsService.findById(id);
    return problem;
  }

  @ApiCreatedResponse({ type: () => Problem })
  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Problem)
  async create(@Body() dto: CreateProblemDto, @GetUser() user: User) {
    const problem = await this.problemsService.create(user, dto);
    return problem;
  }
}
