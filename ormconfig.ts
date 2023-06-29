import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default async function createTypeOrmConfig(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: configService.get<any>('TYPEORM_CONNECTION'),
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT'),
    username: configService.get<string>('TYPEORM_USERNAME'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    database: configService.get<string>('TYPEORM_NAME'),
    synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
    entities: [configService.get<any>('TYPEORM_ENTITIES')],
    migrations: [configService.get<any>('TYPEORM_MIGRATIONS')],
    subscribers: [configService.get<any>('TYPEORM_SUBSCRIBERS')],
    migrationsRun: configService.get<boolean>('TYPEORM_MIGRATIONS_RUN'),
    migrationsTableName: configService.get<string>(
      'TYPEORM_MIGRATIONS_TABLE_NAME',
    ),
    autoLoadEntities: true,
  };
}
