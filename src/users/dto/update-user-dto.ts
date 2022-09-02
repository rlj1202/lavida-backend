import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  password?: string;

  @ApiProperty()
  email?: string;
}
