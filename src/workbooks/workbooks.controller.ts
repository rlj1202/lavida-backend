import { Controller } from '@nestjs/common';
import { WorkbooksService } from './workbooks.service';

@Controller('workbooks')
export class WorkbooksController {
  constructor(private readonly workbooksService: WorkbooksService) {}
}
