import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

const envFile = /*'.development.env'; */ `.${process.env.NODE_ENV}.env`;
config({ path: envFile });
console.log(`process.env.node_env: ${process.env.NODE_ENV}`);
console.log(
  `process.env.TYPEORM_CONNECTION: ${process.env.TYPEORM_CONNECTION}`,
);
console.log(`process.env.TYPEORM_DATABASE: ${process.env.TYPEORM_DATABASE}`);

const CONNECTION: DataSourceOptions = {
  type: <any>process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: false,
};

export default CONNECTION;
