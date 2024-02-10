import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DevicesModule } from 'src/components/stock/devices/devices.module';
import { RoleModule } from 'src/components/role/role.module';
import { UserModule } from 'src/components/user/user.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dbName: configService.getOrThrow<string>('TYPEORM_DATABASE'),
        type: configService.getOrThrow<any>('TYPEORM_CONNECTION'),
        host: configService.getOrThrow<string>('TYPEORM_HOST'),
        port: +configService.getOrThrow<number>('TYPEORM_PORT'),
        username: configService.getOrThrow<string>('TYPEORM_USERNAME'),
        password: configService.getOrThrow<string>('TYPEORM_PASSWORD'),
        database: configService.getOrThrow<string>('TYPEORM_DATABASE'),
        synchronize: Boolean(
          configService.getOrThrow<string>('TYPEORM_SYNCHRONIZE'),
        ),
        entities: [configService.getOrThrow<any>('TYPEORM_ENTITIES')],
        entitiesTs: [configService.getOrThrow<any>('TYPEORM_ENTITIESTS')],
        autoLoadEntities: Boolean(
          configService.getOrThrow<string>('TYPEORM_AUTOLOADENTITIES'),
        ),
        namingStrategy: UnderscoreNamingStrategy,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    DevicesModule,
  ],
})
export class DatabaseModule {}
