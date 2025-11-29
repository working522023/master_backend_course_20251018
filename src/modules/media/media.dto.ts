import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";
import { MediaStatus } from "../../common";

export class CreateMediaDto {
  @Column("varchar", { length: 200, nullable: true })
  @IsString()
  @IsEmpty()
  name?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  url?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  size?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  mimeType?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  path?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  description?: string;

  @Column("varchar", { length: 20, default: MediaStatus.ACTIVE })
  @IsString()
  @IsNotEmpty()
  status?: MediaStatus;
}

export class UpdateMediaDto {
  @Column("varchar", { length: 200, nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  url?: string;

  @Column("text", { nullable: true })
  @IsNumber()
  @IsOptional()
  size?: number;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  path?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column("varchar", { length: 20, default: MediaStatus.ACTIVE })
  @IsString()
  @IsOptional()
  status?: MediaStatus;
}
