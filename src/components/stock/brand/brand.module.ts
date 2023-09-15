import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Brand } from './entities/brand.entity';

@Module({
  controllers: [BrandController],
  imports: [MikroOrmModule.forFeature([Brand])],
  providers: [BrandService],
})
export class BrandModule {}
