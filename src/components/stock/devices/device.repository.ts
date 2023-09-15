import { EntityRepository } from '@mikro-orm/core';
import { Device } from './entities/device.entity';

export class DeviceRepository extends EntityRepository<Device> {}
