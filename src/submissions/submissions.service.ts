import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsService } from 'src/problems/problems.service';
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

  async submitCode(dto: SubmitCodeDto) {
    const problem = await this.problemsService.findById(dto.problemId);

    const submission = new Submission();
    submission.problem = problem;
    submission.code = dto.code;
    submission.codeLength = dto.code.length;
    submission.language = dto.language;

    submission.memory = 0;
    submission.time = 0;
    submission.status = SubmissionStatus.WAITING;

    // TODO:
    submission.user;

    return this.submissionsRepository.save(submission);
  }

  async findById(submissionId: number) {
    return await this.submissionsRepository.findOne({
      where: { id: submissionId },
    });
  }
}
