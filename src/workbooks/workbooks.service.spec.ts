import { Test, TestingModule } from '@nestjs/testing';
import { WorkbooksService } from './workbooks.service';

describe('WorkbooksService', () => {
  let service: WorkbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkbooksService],
    }).compile();

    service = module.get<WorkbooksService>(WorkbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
