import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
import { Functionality } from './entities/functionality.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class FunctionalityService {
  constructor(
    @InjectRepository(Functionality)
    private readonly functionalityRepository: EntityRepository<Functionality>,
    private readonly em: EntityManager,
  ) {}

  async create(
    createFunctionalityDto: CreateFunctionalityDto,
  ): Promise<Functionality> {
    const { name } = createFunctionalityDto;
    const exists = await this.functionalityRepository.count({
      $or: [{ name }],
    });
    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { name: 'Functionality name must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const functionality = new Functionality();
    this.em.assign(functionality, createFunctionalityDto);
    this.em.persistAndFlush(functionality);
    functionality.id = (
      await this.functionalityRepository.findOne({ $or: [{ name }] })
    ).id;
    return functionality;
  }

  async findAll() {
    return await this.functionalityRepository.findAll();
  }

  async findOne(id: number) {
    return await this.functionalityRepository.findOne(id);
  }

  async findOneByName(name: string): Promise<Functionality> {
    return await this.functionalityRepository.findOne({ name });
  }

  async update(
    id: number,
    updateFunctionalityDto: UpdateFunctionalityDto,
  ): Promise<Functionality> {
    const hardware = await this.functionalityRepository.findOne(id);
    if (!hardware) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the role fields
    Object.assign(hardware, updateFunctionalityDto);

    // Save the updated user
    this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.functionalityRepository.nativeDelete(id);
  }
}
