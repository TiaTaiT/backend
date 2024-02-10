import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { RoleModule } from './components/role/role.module';
import { DatabaseModule } from './database/config/database.module';
import { FileStorageModule } from './helpers/file-storage/file-storage.module';
import { DevicesModule } from './components/stock/devices/devices.module';
import { StatusModule } from './components/stock/status/status.module';
import { TypeModule } from './components/stock/type/type.module';
import { BrandModule } from './components/stock/brand/brand.module';
import { ModelsModule } from './components/stock/models/models.module';
import { PimModule } from './components/stock/pim/pim.module';
import { DocumentModule } from './components/stock/document/document.module';
import { ProtocolModule } from './components/stock/protocol/protocol.module';
import { HardwareModule } from './components/app-auth/hardware/hardware.module';
import { FunctionalityModule } from './components/app-auth/functionality/functionality.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.${process.env.NODE_ENV}.env`,
});
@Module({
  imports: [
    envModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    RoleModule,
    DevicesModule,
    StatusModule,
    TypeModule,
    BrandModule,
    ModelsModule,
    PimModule,
    DocumentModule,
    ProtocolModule,
    FileStorageModule,
    HardwareModule,
    FunctionalityModule,
  ],
})
export class AppModule {}
