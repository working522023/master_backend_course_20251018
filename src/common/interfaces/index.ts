import { Request, Response } from 'express';
import { AuthController, MediaController, User, UserController } from '../../modules';

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

export interface MediaRoute {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof MediaController;
    action: keyof MediaController;
    middlewares?: any[];
}

export interface JwtPayload {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface TokenResponse {
  token: string;
  // refreshToken: string;
  // user: JwtPayload;
}

export interface UserRequest extends Request {
  user?: JwtPayload;
}

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
}

export interface RawUserQueryParams {
  page?: string;
  offset?: string;
  sort_by?: keyof User;
  order_by?: 'ASC' | 'DESC';
  start_date?: string;
  end_date?: string;
  filter?: string;
}

export interface ParsedUserQueryParams {
  page: number;
  offset: number;
  sort_by: keyof User;
  order_by: 'ASC' | 'DESC';
  start_date?: Date;
  end_date?: Date;
  filter?: Record<string, any>;
}

export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
  value?: any;
}


export interface ApiResponse<T> {
  data?: T;
  error?: ErrorDetail[];
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  offset: number;
  total: number;
}


export interface ParsedQueryParams {
  page: number;
  offset: number;
  sortBy: keyof User;
  orderBy: "ASC" | "DESC";
  startDate?: Date;
  endDate?: Date;
  filter: Record<string, string>;
}

// export interface Route<C = any> {
//   method: 'get' | 'post' | 'put' | 'delete' | 'patch';
//   route: string;
//   controller: new () => C;
//   action: keyof C;
//   middlewares?: RequestHandler[];
// }


export interface ValidationErrorDetail {
  field: string;
  message: string;
  value: any;
}

export type CookieOptions = {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    domain?: string | undefined,
    path: string,
    maxAge: number;
};

export interface GoogleUser {
    id: string;
    displayName: string;
    emails: { value: string; verified: boolean }[];
    provider: string;
    accessToken: string;
    refreshToken?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
  }


export interface EncryptedDecryptedData {
    iv: string;
    content: string;
    salt: string;
}



export interface AuthRoute {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    route: string;
    controller: typeof AuthController;
    action: keyof AuthController;
    middlewares?: any[];
}

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

export interface BunnyOptions {
  storageZone: string;
  apiKey: string;
  region?: string;
  directory?: string;
}


export interface HttpExceptionOptions {
  status?: number;
  code?: string; // application-specific error code e.g. 'BAD_REQUEST'
  message?: string;
  details?: any;
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
}

export interface StorageAdapter {
  upload(localPath: string, destinationPath: string): Promise<UploadResult>;
  delete(remotePath: string): Promise<boolean>;
  exists(remotePath: string): Promise<boolean>;
  getPublicUrl(remotePath: string): string;
}

export interface GraphQLContext {
  req: Request;
  res: Response;
  user?: User;
}