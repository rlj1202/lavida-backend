import { IsNotEmpty } from 'class-validator';

export class CreateWorkbookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
