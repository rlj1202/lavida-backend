import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProblemDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  inputDesc: string;

  @ApiProperty()
  @IsNotEmpty()
  outputDesc: string;

  /** in milli seconds */
  @ApiProperty({
    description: 'in milli seconds',
  })
  @IsNotEmpty()
  timeLimit: number;

  /** in bytes */
  @ApiProperty({
    description: 'in bytes',
  })
  @IsNotEmpty()
  memoryLimit: number;
}
