import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { User } from '../../user/entities/user.entity';
import { Device } from './entities/device.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '../../user/user.module';
import { Protocol } from '../protocol/entities/protocol.entity';
import { ProtocolModule } from '../protocol/protocol.module';
import { Type } from '../type/entities/type.entity';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Device, User, Protocol, Type]),
    UserModule,
    ProtocolModule,
    TypeModule,
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
