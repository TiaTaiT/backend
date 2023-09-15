import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Document {
  @PrimaryKey()
  id: number;

  @Property()
  name!: string;

  @Property()
  description?: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  creator!: User;

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne()
  updator?: User;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
