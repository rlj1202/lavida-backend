import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';
import { Workbook } from './entities/workbook.entity';

@Injectable()
export class WorkbooksService {
  constructor(
    @InjectRepository(Workbook)
    private readonly workbooksRepository: Repository<Workbook>,
  ) {}

  async findAll(): Promise<Workbook[]> {
    const workbooks = await this.workbooksRepository.find();
    return workbooks;
  }

  async findById(id: number): Promise<Workbook> {
    const workbook = await this.workbooksRepository.findOne({ where: { id } });
    return workbook;
  }

  async create(user: User, dto: CreateWorkbookDto): Promise<Workbook> {
    const workbook = new Workbook();
    workbook.user = user;
    workbook.title = dto.title;
    workbook.description = dto.description;

    return await this.workbooksRepository.save(workbook);
  }

  async update(id: number, dto: UpdateWorkbookDto): Promise<Workbook> {
    const workbook = await this.findById(id);
    if (dto.title) workbook.title = dto.title;
    if (dto.description) workbook.description = dto.description;

    return this.workbooksRepository.save(workbook);
  }

  async delete(id: number) {
    await this.workbooksRepository.softDelete(id);
  }
}
