import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UseAbility from 'src/casl/ability.decorator';
import { Action } from 'src/casl/casl.enum';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';
import { Workbook } from './entities/workbook.entity';
import { WorkbooksService } from './workbooks.service';

@Controller('workbooks')
export class WorkbooksController {
  constructor(private readonly workbooksService: WorkbooksService) {}

  @Get()
  async findAll() {
    const workbooks = await this.workbooksService.findAll();
    return workbooks;
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const workbook = await this.workbooksService.findById(id);
    return workbook;
  }

  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Workbook)
  async create(@Body() dto: CreateWorkbookDto, @GetUser() user: User) {
    const workbook = await this.workbooksService.create(user, dto);
    return workbook;
  }

  @Patch(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Update, Workbook, WorkbooksService, (req, service) =>
    service.findById(parseInt(req.params.id)),
  )
  async update(@Param('id') id: number, @Body() dto: UpdateWorkbookDto) {
    const workbook = await this.workbooksService.update(id, dto);
    return workbook;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Delete, Workbook, WorkbooksService, (req, service) =>
    service.findById(parseInt(req.params.id)),
  )
  async delete(@Param('id') id: number) {
    await this.workbooksService.delete(id);
  }
}
