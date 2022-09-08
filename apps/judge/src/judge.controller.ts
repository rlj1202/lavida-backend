import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JudgeService } from './judge.service';

@Controller()
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return 'Hello';
  }
}
