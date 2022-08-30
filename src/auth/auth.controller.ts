import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const responseDto = await this.authService.login(user);
    response.cookie('access_token', responseDto.accessToken, {
      httpOnly: true,
      secure: true,
    });

    return responseDto;
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user);
    response.clearCookie('access_token');
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshResDto = await this.authService.refresh(user);
    response.cookie('access_token', refreshResDto.accessToken);

    return refreshResDto;
  }

  @UseGuards(JwtGuard)
  @Post('userinfo')
  async getCurrentUserInfo(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh/ping')
  async refreshPing() {
    return 'Success';
  }
}
