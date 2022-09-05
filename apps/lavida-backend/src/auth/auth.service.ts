import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../src/users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginResponseDto } from '../../src/users/dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    const doesMatch = await bcrypt.compare(password, user.passwordHash);

    if (!doesMatch) {
      throw new HttpException(
        'User password does not match.',
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.FORBIDDEN);
    }

    if (!user.refreshTokenHash) {
      throw new HttpException('User is logged out.', HttpStatus.FORBIDDEN);
    }

    const doesRTMathes = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!doesRTMathes) {
      throw new HttpException(
        'Refresh token does not match.',
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  async generateAccessToken(user: User) {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      roles: [],
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });

    return accessToken;
  }

  async generateRefreshToken(user: User) {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      roles: [],
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    return refreshToken;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    await this.userService.setRefreshToken(user.id, refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(user: User): Promise<RefreshResponseDto> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    await this.userService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(user: User) {
    await this.userService.deleteRefreshToken(user.id);
  }
}
