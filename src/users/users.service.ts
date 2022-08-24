import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user-dto';

// TODO:
const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User | undefined> {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new HttpException('Username already exists.', HttpStatus.FORBIDDEN);
    }

    const user = new User();
    user.username = dto.username;
    user.passwordHash = await bcrypt.hash(dto.password, saltRounds);

    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.findById(id);
    user.passwordHash = await bcrypt.hash(dto.password, saltRounds);

    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async setRefreshToken(id: number, refreshToken: string) {
    await this.userRepository.update(id, { refreshToken });
  }

  async deleteRefreshToken(id: number) {
    await this.userRepository.update(id, { refreshToken: null });
  }
}
