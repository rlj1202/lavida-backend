import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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

  async login() {}

  async logout() {}
}
