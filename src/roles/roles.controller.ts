import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UseAbility from 'src/casl/ability.decorator';
import { Action } from 'src/casl/casl.enum';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return roles;
  }

  @Post()
  @UseGuards(JwtGuard, PoliciesGuard)
  @UseAbility(Action.Create, Role)
  async create(@Body() dto: CreateRoleDto) {
    const role = await this.rolesService.create(dto);
    return role;
  }
}
