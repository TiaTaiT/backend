import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Type } from './entities/type.entity';

@Module({
  controllers: [TypeController],
  imports: [MikroOrmModule.forFeature([Type])],
  providers: [TypeService],
})
export class TypeModule {}
