import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { UserRole, UserStatus } from "../../common";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id!: string;

  @Column("varchar", { length: 30 })
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Column("varchar", { length: 30, nullable: true })
  @IsString()
  @IsEmpty()
  lastName?: string;

   @Column("varchar", { length: 30, nullable: true })
  @IsString()
  @IsEmpty()
  phone?: string;

  @Column({ unique: true })
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

  @Column("varchar", { length: 20, default: UserStatus.ACTIVE })
  @IsString()
  @IsNotEmpty()
  status?: string;

  @Column("varchar", { length: 20, default: UserRole.USER })
  @IsString()
  @IsNotEmpty()
  role?: string;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  @IsOptional()
  @IsUUID()
  createdBy?: string | null;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  @IsOptional()
  @IsUUID()
  updatedBy?: string | null;

  @CreateDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  updatedAt?: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  deletedAt?: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(providedPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(providedPassword, this.password);
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    if (!(await this.comparePassword(currentPassword))) {
      return false;
    }

    if (!newPassword || newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters long");
    }

    this.password = await bcrypt.hash(newPassword, 12);
    return true;
  }
}
