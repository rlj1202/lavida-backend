import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../src/users/entities/user.entity';
import { ROLES_KEY } from './roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user || !user.roles) {
      throw new HttpException(
        'User roles are not provided.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userRoles = user.roles.map((role) => role.name);

    const permitted = userRoles.some((role) => requiredRoles.includes(role));
    if (!permitted) {
      throw new HttpException(
        'User roles does not match.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
