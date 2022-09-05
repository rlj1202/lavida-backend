import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
  ) {}

  async findAll(): Promise<Problem[]> {
    const problems = await this.problemsRepository.find();
    return problems;
  }

  async findById(id: number): Promise<Problem> {
    const problem = await this.problemsRepository.findOne({ where: { id } });
    return problem;
  }

  async create(user: User, dto: CreateProblemDto) {
    const problem = new Problem();
    problem.title = dto.title;
    problem.description = dto.description;
    problem.author = user;
    problem.inputDesc = dto.inputDesc;
    problem.outputDesc = dto.outputDesc;
    problem.timeLimit = dto.timeLimit;
    problem.memoryLimit = dto.memoryLimit;

    return await this.problemsRepository.save(problem);
  }
}
