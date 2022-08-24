import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallbackWithRequest,
} from 'passport-jwt';

interface IVerifyCallbackWithRequest {
  validate(
    ...args: Parameters<VerifyCallbackWithRequest>
  ): ReturnType<VerifyCallbackWithRequest>;
}

@Injectable()
export class JwtRefreshStrategy
  extends PassportStrategy(Strategy, 'jwt-refresh')
  implements IVerifyCallbackWithRequest
{
  constructor(private readonly configService: ConfigService) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // TODO:
    return;
  }
}
