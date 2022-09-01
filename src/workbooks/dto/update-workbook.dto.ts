import { IsNotEmpty } from 'class-validator';

export class UpdateWorkbookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
