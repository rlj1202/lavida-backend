import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginResponseDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}
