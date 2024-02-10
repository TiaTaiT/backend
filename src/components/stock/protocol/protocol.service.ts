import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { Protocol } from './entities/protocol.entity';
import { Device } from '../devices/entities/device.entity';
import { ReturnProtocolDto } from './dto/return-protocol.dto';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(Protocol)
    private readonly protocolRepository: EntityRepository<Protocol>,
    @InjectRepository(Device)
    private readonly deviceRepository: EntityRepository<Device>,
    private readonly em: EntityManager,
  ) {}

  async create(createProtocolDto: CreateProtocolDto): Promise<Protocol> {
    const { name } = createProtocolDto;
    const existsName = await this.protocolRepository.count({ $or: [{ name }] });

    if (existsName > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const protocol = new Protocol(name);
    await this.em.persistAndFlush(protocol);
    return protocol;
  }

  async findAll(): Promise<Protocol[]> {
    return await this.protocolRepository.findAll();
  }

  async findOne(id: number): Promise<ReturnProtocolDto> {
    return await this.protocolRepository.findOne(id);
  }

  async update(
    id: number,
    updateProtocolDto: UpdateProtocolDto,
  ): Promise<Protocol> {
    const protocol = await this.protocolRepository.findOne(id);

    wrap(protocol).assign(updateProtocolDto);
    // Save the updated user
    await this.em.flush();
    return await this.protocolRepository.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.protocolRepository.nativeDelete(id);
  }
}
