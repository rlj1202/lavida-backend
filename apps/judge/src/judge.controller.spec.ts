import { Test, TestingModule } from '@nestjs/testing';
import { JudgeController } from './judge.controller';
import { JudgeService } from './judge.service';

describe('JudgeController', () => {
  let judgeController: JudgeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JudgeController],
      providers: [JudgeService],
    }).compile();

    judgeController = app.get<JudgeController>(JudgeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(judgeController.getHello()).toBe('Hello World!');
    });
  });
});
