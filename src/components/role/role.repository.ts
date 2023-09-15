import { EntityRepository } from '@mikro-orm/core';
import { Role } from './entities/role.entity';

export class RoleRepository extends EntityRepository<Role> {
  async findRoles(ids: number[]): Promise<Role[]> {
    const roles = await this.find({ id: { $in: ids } });
    return roles;
  }
}
