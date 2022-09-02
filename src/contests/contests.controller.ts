import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContestsService } from './contests.service';

@ApiTags('contests')
@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}
}
