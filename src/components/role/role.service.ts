import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly em: EntityManager,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description } = createRoleDto;
    const exists = await this.roleRepository.count({ $or: [{ name }] });

    if (exists > 0) {
      throw new HttpException({
          message: 'Input data validation failed',
          errors: { username: 'Username and email must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new role
    const role = new Role(name, description);
    await this.em.persistAndFlush(role);
    return role;
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async findRole(id: number) {
    return await this.roleRepository.findOne(id);
  }

  async findRoles(ids: number[]): Promise<Role[]> {
    const roles = await this.roleRepository.findRoles(ids);

    if (roles.length !== ids.length) {
      const missingRoles = ids.filter(
        (id) => !roles.some((role) => role.id === id),
      );
      throw new NotFoundException(
        `Roles with IDs ${missingRoles.join(', ')} not found`,
      );
    }

    return roles;
  }

  async getRoleByName(name: string) {
    return await this.roleRepository.findOne({ name });
  }

  async remove(id: number) {
    return await this.roleRepository.nativeDelete(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findRole(id);
    if (!role) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    //const roles = await this.rolesService.findRoles(roleIds);

    // Update the role fields
    Object.assign(role, updateRoleDto);

    // Save the updated user
    await this.em.flush();
    return this.findRole(id);
  }
}
