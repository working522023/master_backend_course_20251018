import { ILike, Repository } from 'typeorm';
import { AppDataSource } from '../../core';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  NotFoundException,
  ConflictException,
} from '../../core';

export class UserService {
  private get repo(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    sortBy: keyof User = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ) {
    const [data, total] = await this.repo.findAndCount({
      where: search
        ? [
            { firstName: ILike(`%${search}%`) },
            { lastName: ILike(`%${search}%`) },
            { email: ILike(`%${search}%`) },
          ]
        : {},
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(input: Partial<User>) {
    const user = this.repo.create(input);
    return this.repo.save(user);
  }

  async update(id: string, input: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, input);
    return this.repo.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return { message: 'User deleted successfully' };
  }
}
