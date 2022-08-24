import { IsNotEmpty } from 'class-validator';

export class SubmitCodeDto {
  @IsNotEmpty()
  problemId: number;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  code: string;
}
