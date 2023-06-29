import { SetMetadata } from '@nestjs/common';
import { AvailableRoles } from '../role/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AvailableRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
