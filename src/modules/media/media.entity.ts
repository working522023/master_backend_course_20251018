import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { Entity, Column } from "typeorm";
import { BaseEntity, MediaStatus } from "../../common";

@Entity("media")
export class Media  extends BaseEntity {
  @Column("varchar", { length: 200, nullable: true })
  @IsString()
  @IsEmpty()
  name?: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsEmpty()
  url?: string;

  @Column("bigint", { nullable: true })
  @IsNumber()
  size?: number;

  @Column("varchar", { length: 200, nullable: true })
  @IsString()
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
