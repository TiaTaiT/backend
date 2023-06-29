import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.getOrThrow<any>('TYPEORM_CONNECTION'),
        host: configService.getOrThrow<string>('TYPEORM_HOST'),
        port: configService.getOrThrow<number>('TYPEORM_PORT'),
        username: configService.getOrThrow<string>('TYPEORM_USERNAME'),
        password: configService.getOrThrow<string>('TYPEORM_PASSWORD'),
        database: configService.getOrThrow<string>('TYPEORM_DATABASE'),
        synchronize: configService.getOrThrow<boolean>('TYPEORM_SYNCHRONIZE'),
        entities: [configService.getOrThrow<any>('TYPEORM_ENTITIES')],
        subscribers: [configService.getOrThrow<any>('TYPEORM_SUBSCRIBERS')],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
