import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Pim {
  @PrimaryKey()
  id: number;

  @Property()
  name!: string;

  @Property()
  content!: string; // PiM itself (text)

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  creator!: User;

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne()
  updator?: User;
}
