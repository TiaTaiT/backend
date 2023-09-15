import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/components/user/entities/user.entity';
import { UserModule } from 'src/components/user/user.module';
import { Model } from './entities/model.entity';

@Module({
  controllers: [ModelsController],
  imports: [MikroOrmModule.forFeature([User, Model]), UserModule],
  providers: [ModelsService],
})
export class ModelsModule {}
