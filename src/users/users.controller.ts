import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return await this.authService.login(user);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  async update(@Body() dto: UpdateUserDto) {
    // TODO:
    const user = await this.userService.update(0, dto);
    return user;
  }

  @UseGuards(JwtGuard)
  @Post('ping')
  async ping(@Req() request: Request) {
    return request.user;
  }
}
