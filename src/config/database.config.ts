import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const postgreSQLConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.NEST_PUBLIC_POSTGRES_HOST,
  port: Number(process.env.NEST_PUBLIC_POSTGRES_PORT),
  username: String(process.env.NEST_PUBLIC_DATABASE_USER),
  password: String(process.env.NEST_PUBLIC_DATABASE_PASSWORD),
  database: String(process.env.NEST_PUBLIC_POSTGRES_DATABASE),
  autoLoadEntities: true,
  entities: ['./dist' + '**/*.entity{.ts,.js}'],
  synchronize: false,
  extra: {
    connectionLimit: process.env.NEST_PUBLIC_POSTGRES_CONNECTION_LIMIT,
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

export { postgreSQLConfig };
