import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto).then((res) => res);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findRole(id: number) {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async findRoles(ids: number[]): Promise<Role[]> {
    const roles = await this.rolesRepository.findBy({ id: In(ids) });

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
    return await this.rolesRepository.findOne({ where: { name } });
  }

  async remove(id: number) {
    return await this.rolesRepository.delete(id);
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
    await this.rolesRepository.save(role);
    return this.findRole(id);
  }
}
