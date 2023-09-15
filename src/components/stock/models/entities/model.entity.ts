import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Model {
  @PrimaryKey()
  id: number;

  @Property()
  description: string; // Some description for identification

  @Property()
  model3Dpath: string; // [note: 'path to 3D model of device']

  @Property()
  model2Dpath: string; // [note: 'path to 2D model of device']

  @Property()
  image: string; // [note: 'preview image of device']

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  creator!: User;

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne()
  updator?: User;
}
