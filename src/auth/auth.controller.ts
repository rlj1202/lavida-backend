import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): Promise<void> {
    return;
  }

  @Post('logout')
  logout(): Promise<void> {
    return;
  }
}
