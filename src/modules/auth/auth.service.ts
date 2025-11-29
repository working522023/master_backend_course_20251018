import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { AppDataSource, BadRequestException, ConflictException, UnauthorizedException } from '../../core';
import { RegisterDto, LoginDto } from './auth.dto';
import { JWTService } from '../../common/utils';

export class AuthService {
  private get repo(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  async register(dto: RegisterDto): Promise<User> {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists.');
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const { email, password } = dto;
    if (!email?.trim() || !password?.trim()) throw new BadRequestException('Email and password required.');
    const user = await this.repo.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) throw new UnauthorizedException('Invalid credentials.');
    return { token: JWTService.generateToken({ id: user.id, email: user.email, role: user.role }) };
  }
}