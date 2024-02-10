import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Functionality } from '../../functionality/entities/functionality.entity';

@Entity()
export class Hardware {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  serial: string;

  @Property()
  description: string;

  @ManyToMany(() => Functionality)
  functionalities: Collection<Functionality> = new Collection<Functionality>(
    this,
  );
}
