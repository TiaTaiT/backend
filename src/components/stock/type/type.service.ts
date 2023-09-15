import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Type } from './entities/type.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: EntityRepository<Type>,
    private readonly em: EntityManager,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const { description } = createTypeDto;
    const exists = await this.typeRepository.count({
      $or: [{ description }],
    });

    if (exists > 0) {
      throw new HttpException({
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new type
    const devType = new Type(description);
    await this.em.persistAndFlush(devType);
    return devType;
  }

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.findAll();
  }

  async findOne(id: number): Promise<Type> {
    return await this.typeRepository.findOne(id);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const devType = await this.findOne(id);

    if (!devType) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(devType).assign(updateTypeDto);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.typeRepository.nativeDelete(id);
  }
}
