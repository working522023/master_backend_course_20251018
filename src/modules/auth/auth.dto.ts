import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from "class-validator";

const PASSWORD_RULE = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const PASSWORD_MESSAGE =
  "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.";


const normalizeEmail = ({ value }: any) =>
  typeof value === "string" ? value.trim().toLowerCase() : value;


export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(normalizeEmail)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword(PASSWORD_RULE, { message: PASSWORD_MESSAGE })
  password!: string;

  @IsOptional()
  @IsString()
  address?: string;
}


export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(normalizeEmail)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword(PASSWORD_RULE, { message: PASSWORD_MESSAGE })
  password!: string;
}