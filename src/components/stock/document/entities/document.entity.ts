import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Document {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name!: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  creator!: User;

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne()
  updater?: User;

  constructor(name: string) {
    this.name = name;
  }
}
