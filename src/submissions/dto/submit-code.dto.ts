import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SubmitCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  problemId: number;

  @ApiProperty()
  @IsNotEmpty()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
