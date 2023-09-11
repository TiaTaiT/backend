import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { AvailableRoles } from '../role/roles.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RoleService,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUser(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
    const role = await this.rolesService.getRoleByName(AvailableRoles.USER);
    user.roles = [role];
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      relations: {
        roles: true,
      },
      where: {
        email: email,
      },
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { roleIds, ...userData } = updateUserDto;

    const user = await this.findUser(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles = await this.rolesService.findRoles(roleIds);

    // Update the user's fields
    Object.assign(user, userData);

    // Update the user's roles if provided
    if (roles) {
      user.roles = roles;
    }

    // Create a new User entity from the updateUserDto object
    const updatedUser = plainToClass(User, user);

    // Save the updated user
    await this.usersRepository.save(updatedUser);
    return this.findUser(userId);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async addUserRole(userId: number, roleId: number): Promise<User> {
    const user = await this.findUser(userId);
    const role = await this.rolesService.findRole(roleId);
    user.roles.push(role);
    return user;
  }
}
