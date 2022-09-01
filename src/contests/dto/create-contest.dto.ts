import { IsNotEmpty } from 'class-validator';

export class CreateContestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
