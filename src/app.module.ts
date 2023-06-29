import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { RoleModule } from './components/role/role.module';
import { DatabaseModule } from './database/database.module';

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
  ],
})
export class AppModule {}
