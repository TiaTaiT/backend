import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Hardware } from './entities/hardware.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Functionality } from '../functionality/entities/functionality.entity';

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware)
    private readonly hardwareRepository: EntityRepository<Hardware>,
    @InjectRepository(Functionality)
    private readonly functionalityRepository: EntityRepository<Functionality>,
    private readonly em: EntityManager,
  ) {}

  async create(createHardwareDto: CreateHardwareDto): Promise<Hardware> {
    const { serial } = createHardwareDto;
    const exists = await this.hardwareRepository.count({ $or: [{ serial }] });
    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { serial: 'Hardware serial number name must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hardware = new Hardware();
    this.em.assign(hardware, createHardwareDto);
    this.em.persistAndFlush(hardware);
    hardware.id = (
      await this.hardwareRepository.findOne({ $or: [{ serial }] })
    ).id;
    return hardware;
  }

  async findOne(id: number): Promise<Hardware> {
    return await this.hardwareRepository.findOne(id);
  }

  async findBySerial(serial: string): Promise<Hardware> {
    return await this.hardwareRepository.findOne(
      { serial },
      {
        populate: ['functionalities'],
      },
    );
  }

  async update(
    id: number,
    updateHardwareDto: UpdateHardwareDto,
  ): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne(id);
    if (!hardware) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.em.assign(hardware, updateHardwareDto);
    this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.hardwareRepository.nativeDelete(id);
  }
}
