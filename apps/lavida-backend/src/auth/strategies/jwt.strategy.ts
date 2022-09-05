import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyCallbackWithRequest,
} from 'passport-jwt';
import { User } from '../../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../jwt-payload.interface';

interface IVerifyCallback {
  validate(...args: Parameters<VerifyCallback>): ReturnType<VerifyCallback>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IVerifyCallbackWithRequest {
  validate(
    ...args: Parameters<VerifyCallbackWithRequest>
  ): ReturnType<VerifyCallbackWithRequest>;
}

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements IVerifyCallback
{
  constructor(
    // private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Jwt token from cookie
        (req: Request) => {
          const access_token = req.cookies?.['access_token'];
          if (!access_token) {
            return null;
          }
          return access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  /**
   * @description Validate the jwt token and return the user entity.
   * @param payload Jwt payload json object
   * @returns User entity
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.userId },
      relations: { roles: true },
    });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
