import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Device } from '../../devices/entities/device.entity';

@Entity()
export class Protocol {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name!: string;

  @ManyToMany(() => Device, (device) => device.protocols)
  devices: Collection<Device> = new Collection<Device>(this);

  constructor(name: string) {
    this.name = name;
  }
}
