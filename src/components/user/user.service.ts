import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RoleService } from '../role/role.service';
import { AvailableRoles } from '../role/roles.enum';
import { UserRepository } from './user.repository';
import { EntityManager, wrap } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private rolesService: RoleService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findUser(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { populate: ['name'] });
  }

  async create(user: User): Promise<User> {
    // check uniqueness of username/email
    const { name, email } = user;
    const exists = await this.userRepository.count({
      $or: [{ name }, { email }],
    });

    if (exists > 0) {
      throw new HttpException({
          message: 'Input data validation failed',
          errors: { username: 'Username and email must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.rolesService.getRoleByName(AvailableRoles.USER);
    user.roles.add(role);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findOneOptions = {
      email: email,
    };
    return await this.userRepository.findOne(findOneOptions, {
      populate: ['roles'],
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    //const roles = await this.rolesService.findRoles(updateUserDto.roleIds);
    wrap(user).assign(updateUserDto);
    //user.roles.add(roles);
    // Save the updated user
    await this.em.flush();
    return await this.findUser(userId);
  }

  async remove(id: number) {
    return await this.userRepository.nativeDelete(id);
  }

  async addUserRole(userId: number, roleId: number): Promise<User> {
    const user = await this.findUser(userId);
    const role = await this.rolesService.findRole(roleId);
    user.roles.add(role);
    return user;
  }
}
