import { Test, TestingModule } from '@nestjs/testing';
import { WorkbooksController } from './workbooks.controller';

describe('WorkbooksController', () => {
  let controller: WorkbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkbooksController],
    }).compile();

    controller = module.get<WorkbooksController>(WorkbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
