import { Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { env } from '../configs';
import { UnauthorizedException, ForbiddenException } from '../exceptions';
import { UserRequest, JwtPayload, UserRoleEnum} from '../../common';

export const authMiddleware = (roles: UserRoleEnum[] = []) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];
      if (!token) throw new UnauthorizedException('No token provided');

      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      if (!decoded || typeof decoded === 'string') {
        throw new UnauthorizedException('Invalid token payload');
      }

      if (roles.length > 0 && !roles.includes(decoded.role as UserRoleEnum)) {
        throw new ForbiddenException('Unauthorized');
      }

      req.user = decoded;

      return next();
    } catch (err: unknown) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please log in again.',
          code: 'TOKEN_EXPIRED',
        });
      }

      if (err instanceof JsonWebTokenError) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please log in again.',
          code: 'INVALID_TOKEN',
        });
      }

      const error = err as any;
      return res.status(error?.statusCode || 401).json({
        success: false,
        message: error?.message || 'Unauthorized',
      });
    }
  };
};