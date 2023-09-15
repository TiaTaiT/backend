import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Status } from './entities/status.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
    private readonly em: EntityManager,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const { name } = createStatusDto;
    const exists = await this.statusRepository.count({ $or: [{ name }] });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const status = new Status(name);
    await this.em.persistAndFlush(status);
    return status;
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.findAll();
  }

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findOne(id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);

    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(status).assign(updateStatusDto);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.statusRepository.nativeDelete(id);
  }
}
