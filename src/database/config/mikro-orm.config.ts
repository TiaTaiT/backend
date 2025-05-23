import { config } from 'dotenv';
import { Options, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

console.log(process.env.NODE_ENV);

const envFile = `.${process.env.NODE_ENV}.env`;
config({ path: envFile });
console.log('envFilePath: ', envFile);

const options: Options = {
  dbName: process.env.MIKRO_ORM_DATABASE,
  driver: PostgreSqlDriver,
  host: process.env.MIKRO_ORM_HOST,
  port: parseInt(process.env.MIKRO_ORM_PORT),
  user: process.env.MIKRO_ORM_USERNAME,
  password: process.env.MIKRO_ORM_PASSWORD,
  entities: [process.env.MIKRO_ORM_ENTITIES],
  entitiesTs: [process.env.MIKRO_ORM_ENTITIESTS],
  namingStrategy: UnderscoreNamingStrategy,
  logger: console.log, // Enable query logging to console
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './src/database/migrations', // path to the folder with migrations
    pathTs: './src/database/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
};
console.log('MikroORM configuration:', options);
export default options;
