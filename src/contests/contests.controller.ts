import { Controller } from '@nestjs/common';
import { ContestsService } from './contests.service';

@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}
}
