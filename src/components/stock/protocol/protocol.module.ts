import { Module, forwardRef } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Protocol } from './entities/protocol.entity';
import { Device } from '../devices/entities/device.entity';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Protocol, Device]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [ProtocolController],
  providers: [ProtocolService],
  exports: [ProtocolService],
})
export class ProtocolModule {}
