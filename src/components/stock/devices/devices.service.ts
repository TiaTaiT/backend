import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceRepository } from './device.repository';
import { UserRepository } from '../../user/user.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const { name } = createDeviceDto;
    const exists = await this.deviceRepository.count({
      $or: [{ name }],
    });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const device = new Device();
    this.em.assign(device, createDeviceDto);
    await this.setObjects(device);
    await this.em.persistAndFlush(device);
    return device;
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.findAll({
      populate: ['status', 'type', 'brand', 'model', 'pim'],
    });
  }

  async findOne(id: number): Promise<Device> {
    return await this.deviceRepository.findOne(id, {
      populate: ['status', 'type', 'brand', 'model', 'pim'],
    });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);

    if (!device) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    this.em.assign(device, updateDeviceDto);
    device.updator = await this.userRepository.findOne(1);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.deviceRepository.nativeDelete(id);
  }

  private async setObjects(device: Device) {
    device.creator = await this.userRepository.findOne(1);
    device.updator = device.creator;
  }
}
