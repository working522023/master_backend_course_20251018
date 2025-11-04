import { DataSource } from 'typeorm';
import { env } from '../configs';
import { User } from '../../modules';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: ['error'],
  entities: [User],
  migrations: [],
});
