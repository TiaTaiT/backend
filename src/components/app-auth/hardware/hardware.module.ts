import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Hardware } from './entities/hardware.entity';
import { Functionality } from '../functionality/entities/functionality.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Hardware, Functionality])],
  controllers: [HardwareController],
  providers: [HardwareService],
})
export class HardwareModule {}
