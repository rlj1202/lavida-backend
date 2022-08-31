import { Controller } from '@nestjs/common';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/casl.enum';
import CheckPolicies from 'src/casl/policies.decorator';
import { Workbook } from './entities/workbook.entity';
import { WorkbooksService } from './workbooks.service';

@Controller('workbooks')
export class WorkbooksController {
  constructor(private readonly workbooksService: WorkbooksService) {}
}
