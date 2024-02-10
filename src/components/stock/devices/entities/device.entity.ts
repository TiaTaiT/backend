import { Status } from '../../status/entities/status.entity';
import { User } from '../../../user/entities/user.entity';
import { DeviceRepository } from '../device.repository';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Brand } from '../../brand/entities/brand.entity';
import { Model } from '../../models/entities/model.entity';
import { Pim } from '../../pim/entities/pim.entity';
import { Protocol } from '../../protocol/entities/protocol.entity';
import { Type } from '../../type/entities/type.entity';

@Entity({ customRepository: () => DeviceRepository })
export class Device {
  [EntityRepositoryType]?: DeviceRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  alterName: string = '';

  @Property()
  description: string = '';

  @Property()
  vendorCode: string = '';

  @Property()
  canHasChildren!: boolean;

  @Property()
  virtual!: boolean;

  @Property({ unique: true, nullable: true })
  erpCode?: string;

  @Property({ type: 'float' })
  length: number = 0.0; // float [note: 'Device length in meters']

  @Property({ type: 'float' })
  width: number = 0.0; // float [note: 'Device width in meters']

  @Property({ type: 'float' })
  height: number = 0.0; // float [note: 'Device height in meters']

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  creator!: User;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne()
  updater!: User;

  @ManyToOne()
  status!: Status;

  @ManyToOne({ nullable: true })
  type?: Type;

  @ManyToOne({ nullable: true })
  brand?: Brand;

  @ManyToOne({ nullable: true })
  model?: Model;

  @ManyToOne({ nullable: true })
  pim?: Pim;

  @ManyToMany(() => Protocol)
  protocols: Collection<Protocol> = new Collection<Protocol>(this);
}
