import dotenv from 'dotenv';
import Joi from 'joi';
import { EnvConfig } from '../../common';

dotenv.config();
console.log({host: process.env.DB_HOST});

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  LDB_SECRET_KEY: Joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = value as EnvConfig;
