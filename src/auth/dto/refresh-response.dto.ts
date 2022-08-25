import { IsNotEmpty } from 'class-validator';

export class RefreshResponseDto {
  @IsNotEmpty()
  accessToken: string;

  refreshToken?: string;
}
