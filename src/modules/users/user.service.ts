import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AppDataSource, BadRequestException, ConflictException, NotFoundException } from "../../core";
import { CreateUserDto } from "./user.dto";

export class UserService {
  private userRepo: Repository<User> = AppDataSource.getRepository(User);

  // Get All User
  async findAll(): Promise<User[]> {
    const users =  await this.userRepo.find();
    return users;
  }

  // Get By User ID
  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id} });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Create User
  async createUser(dto : CreateUserDto): Promise<User> {
    try {
        const existing = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existing) throw new ConflictException('Email already in use');
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    } catch (error) {
        throw new BadRequestException('Please');
    }
  }

  // Update User


  // Delete User

}
