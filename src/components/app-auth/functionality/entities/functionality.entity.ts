import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Hardware } from '../../hardware/entities/hardware.entity';

@Entity()
export class Functionality {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name: string;

  @Property()
  description!: string;

  @ManyToMany(() => Hardware, (hardware) => hardware.functionalities)
  hardwares: Collection<Hardware> = new Collection<Hardware>(this);
}
