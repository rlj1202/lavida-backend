import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @GetUser() user: User) {
    return await this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@GetUser() user: User) {
    await this.authService.logout(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@GetUser() user: User) {
    return await this.authService.refresh(user);
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
