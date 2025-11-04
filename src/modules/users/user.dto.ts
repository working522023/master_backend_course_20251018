import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";
import { UserRole } from "../../common";

export class CreateUserDto {
  @Column("varchar", { length: 30 })
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Column("varchar", { length: 30, nullable: true })
  @IsString()
  @IsEmpty()
  lastName?: string;

  @Column()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email?: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
    }
  )
  password?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Column("varchar", { length: 20, default: UserRole.USER })
  @IsString()
  @IsNotEmpty()
  role?: string;
}


export class UpdateUserDto {
  @Column("varchar", { length: 30 })
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Column("varchar", { length: 30, nullable: true })
  @IsString()
  @IsEmpty()
  lastName?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  address?: string;
}