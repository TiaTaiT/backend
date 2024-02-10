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
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Device } from './entities/device.entity';
import { Protocol } from '../protocol/entities/protocol.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SimpleDeviceDto } from './dto/get-simple-device';

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly userRepository: UserRepository,

    @InjectRepository(Protocol)
    private readonly protocolRepository: EntityRepository<Protocol>,
    private readonly em: EntityManager,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<number> {
    const erpCode = createDeviceDto.erpCode?.toUpperCase();
    const name = createDeviceDto.name.toUpperCase();
    const alterName = createDeviceDto.alterName?.toUpperCase();
    await this.isExists(name, erpCode);

    const device = new Device();
    this.em.assign(device, createDeviceDto);
    device.name = name;
    device.alterName = alterName;
    // erp-code must be null or unique string
    device.erpCode = erpCode === '' ? null : erpCode;

    await this.setObjects(device);
    await this.em.persistAndFlush(device);
    return device.id;
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.findAll({
      populate: ['status', 'type', 'brand', 'model', 'pim', 'protocols'],
    });
  }

  async findAllSimple(): Promise<SimpleDeviceDto[]> {
    const devices = await this.deviceRepository.findAll({
      populate: ['protocols'],
    });

    const simpleDeviceDtos = devices.map((device) => {
      const simpleDeviceDto = new SimpleDeviceDto();
      simpleDeviceDto.id = device.id;
      simpleDeviceDto.name = device.name;
      simpleDeviceDto.alterName = device.alterName;
      simpleDeviceDto.description = device.description;
      simpleDeviceDto.deviceType = '';
      simpleDeviceDto.protocols = device.protocols.map((protocol) => {
        return protocol.name;
      });
      return simpleDeviceDto;
    });

    return simpleDeviceDtos;
  }

  async findOne(id: number): Promise<Device> {
    return await this.deviceRepository.findOne(id, {
      populate: ['status', 'type', 'brand', 'model', 'pim', 'protocols'],
    });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);

    if (!device) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    this.em.assign(device, updateDeviceDto);
    device.updater = await this.userRepository.findOne(1);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.deviceRepository.nativeDelete(id);
  }

  private async setObjects(device: Device) {
    device.creator = await this.userRepository.findOne(1);
    device.updater = device.creator;
  }

  private async isExists(name: string, erpCode: string) {
    const nameExists = await this.deviceRepository.count({
      $or: [{ name }],
    });

    if (nameExists > 0) {
      throw new HttpException(
        {
          message: `Device ${name} already exists`,
        },
        HttpStatus.CONFLICT,
      );
    }

    const erpCodeExists = await this.deviceRepository.count({
      $or: [{ erpCode }],
    });

    if (erpCodeExists > 0) {
      throw new HttpException(
        `ERP code ${erpCode} already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }
}
