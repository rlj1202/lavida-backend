import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { LoginResponseDto } from 'src/users/dto/login-response.dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @ApiOkResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const responseDto = await this.authService.login(user);
    response.cookie('access_token', responseDto.accessToken, {
      httpOnly: true,
      secure: true,
    });

    return responseDto;
  }

  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user);
    response.clearCookie('access_token');
  }

  @ApiOkResponse({ type: RefreshResponseDto })
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

  @ApiOkResponse({ type: User })
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
