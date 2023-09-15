import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePimDto } from './dto/create-pim.dto';
import { UpdatePimDto } from './dto/update-pim.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Pim } from './entities/pim.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { User } from 'src/components/user/entities/user.entity';

@Injectable()
export class PimService {
  constructor(
    @InjectRepository(Pim)
    private readonly pimRepository: EntityRepository<Pim>,

    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async create(createPimDto: CreatePimDto): Promise<Pim> {
    const { name } = createPimDto;
    const exists = await this.pimRepository.count({
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

    // create new type
    const pim = new Pim();
    wrap(pim).assign(createPimDto);
    pim.creator = await this.userRepository.findOne(1);
    pim.updator = pim.creator;
    await this.em.persistAndFlush(pim);
    return pim;
  }

  async findAll(): Promise<Pim[]> {
    return await this.pimRepository.findAll();
  }

  async findOne(id: number): Promise<Pim> {
    return await this.pimRepository.findOne(id);
  }

  async update(id: number, updatePimDto: UpdatePimDto): Promise<Pim> {
    const pim = await this.findOne(id);

    if (!pim) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(pim).assign(updatePimDto);
    pim.updator = await this.userRepository.findOne(1);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.pimRepository.nativeDelete(id);
  }
}
