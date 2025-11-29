import { Repository } from "typeorm";
import { AppDataSource, BadRequestException } from "../../core";
import { Media } from "./media.entity";
import { CreateMediaDto, UpdateMediaDto } from "./media.dto";
import { NotFoundException } from "../../core";
import fs from "fs";
import { deleteFromBunny, UploadedFile, uploadToBunny } from "../../common";
import { StorageFactory } from "../../common/utils/storage/storage.factory.ts";

export class MediaService {
  private repo: Repository<Media> = AppDataSource.getRepository(Media);
  // private storage = StorageFactory.create("bunny");
  // private storage = StorageFactory.create();

  // async uploadMedia(localPath: string, fileName: string) {
  //   const remotePath = `uploads/${fileName}`;
  //   return this.storage.upload(localPath, remotePath);
  // }

  // async deleteMedia(path: string) {
  //   return this.storage.delete(path);
  // }

  async getAllMedia(): Promise<Media[]> {
    const items = await this.repo.find();
    return items;
  }

  async getOneMedia(id: string): Promise<Media> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException("File not found");
    return item;
  }

  async createMedia(dto: CreateMediaDto, file?: UploadedFile): Promise<Media> {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    const remoteName = `${Date.now()}-${file.originalname}`;

    const fileUrl = await uploadToBunny(file.path, remoteName, {
      storageZone: process.env.BUNNY_STORAGE_ZONE!,
      apiKey: process.env.BUNNY_API_KEY!,
      directory: "uploads",
    });

    fs.unlink(file.path, () => null);

    // enqueueFileDeletion(file.path);

    const item = this.repo.create({
      ...dto,
      name: file.originalname, url: fileUrl,
      size: file.size,
      mimeType: file.mimetype,
      path: file.path,
    });

    return this.repo.save(item);
  }

  async updateMedia(
    id: string,
    dto: UpdateMediaDto,
    file?: UploadedFile
  ): Promise<Media> {
    const item = await this.getOneMedia(id);

    if (file) {
      if (item.url) {
        await deleteFromBunny(item.url, {
          storageZone: process.env.BUNNY_STORAGE_ZONE!,
          apiKey: process.env.BUNNY_API_KEY!,
        });
      }

      if (item.path && fs.existsSync(item.path)) {
        fs.unlinkSync(item.path);
      }

      // Upload new file
      const remoteName = `${Date.now()}-${file.originalname}`;
      const fileUrl = await uploadToBunny(file.path, remoteName, {
        storageZone: process.env.BUNNY_STORAGE_ZONE!,
        apiKey: process.env.BUNNY_API_KEY!,
        directory: "uploads",
      });

      fs.unlink(file.path, () => null);

      // Update file info
      item.name = file.originalname;
      item.url = fileUrl;
      item.size = file.size;
      item.mimeType = file.mimetype;
      item.path = file.path;
    }

    // Update other metadata
    Object.assign(item, dto);

    return this.repo.save(item);
  }

  async deleteMedia(id: string): Promise<void> {
    const item = await this.getOneMedia(id);

    console.log({item});
    
    if (item.url) {
      await deleteFromBunny(item.url, {
        storageZone: process.env.BUNNY_STORAGE_ZONE!,
        apiKey: process.env.BUNNY_API_KEY!,
      });
    }

    if (item.path && fs.existsSync(item.path)) {
      fs.unlinkSync(item.path);
    }

    item.deletedAt = new Date();
    await this.repo.save(item);
  }
}
