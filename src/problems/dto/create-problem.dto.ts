import { IsNotEmpty } from 'class-validator';

export class CreateProblemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
