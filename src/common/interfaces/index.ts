import { UserController, ProductController, AuthController } from "../../modules";

export interface EnvConfig {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  LDB_SECRET_KEY: string;
}

export interface MainRoute {
  method: "get" | "post" | "put" | "delete" | "patch";
  route: string;
  controller: any;
  action: string;
  middlewares?: any[];
}

export interface UserRoute {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof UserController;
    action: keyof UserController;
    middlewares?: any[];
}

export interface ProductRoute {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof ProductController;
    action: keyof ProductController;
    middlewares?: any[];
}

export interface AuthRoute {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof AuthController;
    action: keyof AuthController;
    middlewares?: any[];
}

export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
  value?: any;
}