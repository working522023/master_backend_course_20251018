import { IsUUID, IsOptional } from "class-validator";
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id!: string;

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;

  @CreateDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  updatedAt?: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  @IsOptional()
  deletedAt?: Date;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  @IsOptional()
  @IsUUID()
  createdBy?: string;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  @IsOptional()
  @IsUUID()
  deletedBy?: string | null;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @BeforeInsert()
  setUtcTime() {
    this.createdAt = new Date();
  }
  @BeforeInsert()
  @BeforeUpdate()
  sanitizeCreatedBy() {
    if (this.createdBy) {
      this.createdBy = this.createdBy.trim();
    }
  }
}
