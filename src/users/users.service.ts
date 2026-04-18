import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const existing = await this.findByEmail(registerDto.email);

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = this.userRepository.create(registerDto);

    return this.userRepository.save(user);
  }

  async updateRefreshToken(userId: number, hash: string | null) {
    await this.userRepository.update(userId, { refreshTokenHash: hash });
  }
}
