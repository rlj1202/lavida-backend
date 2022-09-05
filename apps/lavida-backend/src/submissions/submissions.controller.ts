import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../src/auth/guards/jwt.guard';
import UseAbility from '../../src/casl/ability.decorator';
import { Action } from '../../src/casl/casl.enum';
import { PoliciesGuard } from '../../src/casl/policies.guard';
import { User } from '../../src/users/entities/user.entity';
import { GetUser } from '../../src/users/user.decorator';
import { SubmitCodeDto } from './dto/submit-code.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionsService } from './submissions.service';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @ApiOkResponse({ type: () => Submission, isArray: true })
  @Get()
  async findAll(
    @Query('userId') userId?: number,
    @Query('problemId') problemId?: number,
  ): Promise<Submission[]> {
    const submissions = await this.submissionsService.findAll();
    // TODO: do something with userId and problemId
    return submissions;
  }

  @ApiOkResponse({ type: () => Submission })
  @Get(':id')
  async find(@Param('id') id: number) {
    const submission = await this.submissionsService.findById(id);
    return submission;
  }

  @ApiOkResponse({ type: () => Submission })
  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Submission)
  async submit(@Body() dto: SubmitCodeDto, @GetUser() user: User) {
    await this.submissionsService.submitCode(user, dto);
  }
}
