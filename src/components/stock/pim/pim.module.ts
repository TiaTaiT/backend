import { Module } from '@nestjs/common';
import { PimService } from './pim.service';
import { PimController } from './pim.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/components/user/entities/user.entity';
import { Pim } from './entities/pim.entity';
import { UserModule } from 'src/components/user/user.module';

@Module({
  controllers: [PimController],
  imports: [MikroOrmModule.forFeature([User, Pim]), UserModule],
  providers: [PimService],
})
export class PimModule {}
