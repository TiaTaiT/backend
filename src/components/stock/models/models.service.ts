import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Model } from './entities/model.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { User } from 'src/components/user/entities/user.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: EntityRepository<Model>,

    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const { description } = createModelDto;
    const exists = await this.modelRepository.count({
      $or: [{ description }],
    });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new type
    const model = new Model();
    wrap(model).assign(createModelDto);
    model.creator = await this.userRepository.findOne(1);
    model.updater = model.creator;
    await this.em.persistAndFlush(model);
    return model;
  }

  async findAll(): Promise<Model[]> {
    return await this.modelRepository.findAll();
  }

  async findOne(id: number): Promise<Model> {
    return await this.modelRepository.findOne(id);
  }

  async update(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    const model = await this.findOne(id);

    if (!model) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(model).assign(updateModelDto);
    model.updater = await this.userRepository.findOne(1);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.modelRepository.nativeDelete(id);
  }
}
