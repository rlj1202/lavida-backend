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
import { User } from './entities/user.entity';
import { GetUser } from './user.decorator';
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

  @Get(':username')
  async find(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  async update(@Body() dto: UpdateUserDto, @GetUser() user: User) {
    const updatedUser = await this.userService.update(user.id, dto);
    return updatedUser;
  }

  @UseGuards(JwtGuard)
  @Post('ping')
  async ping(@Req() request: Request) {
    return request.user;
  }
}
