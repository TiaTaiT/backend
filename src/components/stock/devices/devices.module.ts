import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { User } from '../../user/entities/user.entity';
import { Device } from './entities/device.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([Device, User]), UserModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
