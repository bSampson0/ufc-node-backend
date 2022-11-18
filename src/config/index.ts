import dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';

dotenv.config();

const env: string = process.env.NODE_ENV || 'development';

interface Config {
  dialect: Dialect;
  storage: string;
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  define: object;
  logging: boolean;
}

const config: Config = {
  // if we are running tests we use an in memory db with sqlite
  dialect: env === 'test' ? 'sqlite' : <Dialect>process.env.DB_DIALECT,
  // the storage option is only for sqlite
  storage: env === 'test' ? ':memory:' : process.env.DB_STORAGE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  define: {
    underscore: true,
  },
  logging: false,
};

export default config;
