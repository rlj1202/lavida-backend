import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsService } from '../../src/problems/problems.service';
import { User } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SubmitCodeDto } from './dto/submit-code.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionStatus } from './submissions.enums';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly problemsService: ProblemsService,
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
  ) {}

  async submitCode(user: User, dto: SubmitCodeDto): Promise<Submission> {
    const problem = await this.problemsService.findById(dto.problemId);

    const submission = new Submission();
    submission.problem = problem;
    submission.code = dto.code;
    submission.codeLength = dto.code.length;
    submission.language = dto.language;

    submission.memory = 0;
    submission.time = 0;
    submission.status = SubmissionStatus.WAITING;

    submission.user = user;

    return await this.submissionsRepository.save(submission);
  }

  async findAll(): Promise<Submission[]> {
    const subsmissions = await this.submissionsRepository.find();
    return subsmissions;
  }

  async findById(submissionId: number): Promise<Submission> {
    const submission = await this.submissionsRepository.findOne({
      where: { id: submissionId },
    });
    return submission;
  }
}
