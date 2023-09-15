import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Document } from './entities/document.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { User } from 'src/components/user/entities/user.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: EntityRepository<Document>,

    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const { name, description } = createDocumentDto;
    const exists = await this.documentRepository.count({
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
    const document = new Document(name, description ? description : '');
    document.creator = await this.userRepository.findOne(1);
    document.updator = document.creator;
    await this.em.persistAndFlush(document);
    return document;
  }

  async findAll(): Promise<Document[]> {
    return await this.documentRepository.findAll();
  }

  async findOne(id: number): Promise<Document> {
    return await this.documentRepository.findOne(id);
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(id);

    if (!document) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    wrap(document).assign(updateDocumentDto);
    document.updator = await this.userRepository.findOne(1);
    await this.em.flush();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    return await this.documentRepository.nativeDelete(id);
  }
}
