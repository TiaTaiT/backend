import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';
import { RoleRepository } from '../role.repository';

@Entity({ repository: () => RoleRepository })
export class Role {
  [EntityRepositoryType]?: RoleRepository;

  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name!: string;

  @Property()
  description!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Collection<User> = new Collection<User>(this);

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
