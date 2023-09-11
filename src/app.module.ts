import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { RoleModule } from './components/role/role.module';
import { DatabaseModule } from './database/database.module';
import { FileStorageModule } from './helpers/file-storage/file-storage.module';

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
    AuthModule,
    FileStorageModule,
  ],
})
export class AppModule {}
