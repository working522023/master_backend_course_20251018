export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
  LOCKED = "locked"
}

export enum MediaStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export enum ExceptionType {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
