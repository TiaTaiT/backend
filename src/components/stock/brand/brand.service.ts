import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Brand } from './entities/brand.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: EntityRepository<Brand>,
    private readonly em: EntityManager,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const { name } = createBrandDto;
    const exists = await this.brandRepository.count({ $or: [{ name }] });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const brand = new Brand(name);
    await this.em.persistAndFlush(brand);
    return brand;
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.findAll();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandRepository.findOne(id);
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);

    if (!brand) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(brand).assign(updateBrandDto);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.brandRepository.nativeDelete(id);
  }
}
