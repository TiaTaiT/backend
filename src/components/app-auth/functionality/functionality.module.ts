import { Module, forwardRef } from '@nestjs/common';
import { FunctionalityService } from './functionality.service';
import { FunctionalityController } from './functionality.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Hardware } from '../hardware/entities/hardware.entity';
import { Functionality } from './entities/functionality.entity';
import { HardwareModule } from '../hardware/hardware.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Hardware, Functionality]),
    forwardRef(() => HardwareModule),
  ],
  controllers: [FunctionalityController],
  providers: [FunctionalityService],
})
export class FunctionalityModule {}
