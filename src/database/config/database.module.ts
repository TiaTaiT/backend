import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DevicesModule } from 'src/components/stock/devices/devices.module';
import { RoleModule } from 'src/components/role/role.module';
import { UserModule } from 'src/components/user/user.module';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dbName: configService.getOrThrow<string>('MIKRO_ORM_DATABASE'),
        driver: PostgreSqlDriver,
        host: configService.getOrThrow<string>('MIKRO_ORM_HOST'),
        port: +configService.getOrThrow<number>('MIKRO_ORM_PORT'),
        username: configService.getOrThrow<string>('MIKRO_ORM_USERNAME'),
        password: configService.getOrThrow<string>('MIKRO_ORM_PASSWORD'),
        database: configService.getOrThrow<string>('MIKRO_ORM_DATABASE'),
        synchronize: Boolean(
          configService.getOrThrow<string>('MIKRO_ORM_SYNCHRONIZE'),
        ),
        entities: [configService.getOrThrow<any>('MIKRO_ORM_ENTITIES')],
        entitiesTs: [configService.getOrThrow<any>('MIKRO_ORM_ENTITIESTS')],
        autoLoadEntities: Boolean(
          configService.getOrThrow<string>('MIKRO_ORM_AUTOLOADENTITIES'),
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
