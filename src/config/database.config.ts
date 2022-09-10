import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const typeormModuleOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: 'utf8',
    entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    synchronize: false,
    logging: true,
    logger: 'file',
  };
};

export default registerAs('database', () => ({
  config: {
    ...typeormModuleOptions(),
    seeds: [join(__dirname, '../seeds/**/*.seed{.ts,.js}')],
    factories: [join(__dirname, '../factories/**/*.factory{.ts,.js}')],
  },
}));
