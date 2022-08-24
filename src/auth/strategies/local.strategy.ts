import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyFunction } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from '../auth.service';

interface IVerifyCallback {
  validate(...args: Parameters<VerifyFunction>): ReturnType<VerifyFunction>;
}

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements IVerifyCallback
{
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
