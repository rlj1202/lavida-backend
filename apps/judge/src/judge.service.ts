import { Injectable } from '@nestjs/common';

@Injectable()
export class JudgeService {
  getHello(): string {
    return 'Hello World!';
  }
}
