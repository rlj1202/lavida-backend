import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyCallbackWithRequest,
} from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { AuthService } from '../auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IVerifyCallback {
  validate(...args: Parameters<VerifyCallback>): ReturnType<VerifyCallback>;
}

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
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('refreshToken'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken: string = req.body.refreshToken;

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.authService.validateRefreshToken(
      payload.userId,
      refreshToken,
    );

    return user;
  }
}
