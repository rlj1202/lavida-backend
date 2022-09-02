import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UseAbility from 'src/casl/ability.decorator';
import { Action } from 'src/casl/casl.enum';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { GetUser } from './user.decorator';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.create(dto);

    return await this.authService.login(user);
  }

  @ApiOkResponse({ type: User })
  @Get(':username')
  async find(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return user;
  }

  @ApiOkResponse({ type: User })
  @Patch()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(
    Action.Update,
    User,
    UsersService,
    async (req, service) => req.user as User,
  )
  async update(@Body() dto: UpdateUserDto, @GetUser() user: User) {
    const updatedUser = await this.userService.update(user.id, dto);
    return updatedUser;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Delete, User)
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
  }
}
