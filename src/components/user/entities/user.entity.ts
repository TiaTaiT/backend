import { Role } from '../../role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserRepository } from '../user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property()
  avatar?: string; // filename for the avatar image

  @ManyToMany(() => Role)
  roles: Collection<Role> = new Collection<Role>(this);

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
