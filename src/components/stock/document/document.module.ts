import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/components/user/entities/user.entity';
import { Document } from './entities/document.entity';
import { UserModule } from 'src/components/user/user.module';

@Module({
  controllers: [DocumentController],
  imports: [MikroOrmModule.forFeature([User, Document]), UserModule],
  providers: [DocumentService],
})
export class DocumentModule {}
