import axios from "axios";
import { IStorageAdapter, StorageUploadResult } from "./storage.adapter";

export class BunnyStorageAdapter implements IStorageAdapter {
  private readonly zone = process.env.BUNNY_STORAGE_ZONE || "default-zone";
  private readonly apiKey = process.env.BUNNY_API_KEY || "dev-key";
  private readonly region = process.env.BUNNY_STORAGE_REGION || "ny";
  private readonly cdnBase = process.env.BUNNY_CDN_URL || "";

  private get storageUrl() {
    return `https://${this.region}.storage.bunnycdn.com/${this.zone}`;
  }

  async upload(buffer: Buffer, fileName: string, directory = "uploads"): Promise<StorageUploadResult> {
    const remotePath = `${directory}/${fileName}`;

    await axios.put(`${this.storageUrl}/${remotePath}`, buffer, {
      headers: {
        AccessKey: this.apiKey,
        "Content-Type": "application/octet-stream",
      },
      maxBodyLength: Infinity,
    });

    return {
      key: remotePath,
      url: this.getUrl(remotePath),
    };
  }

  async delete(key: string): Promise<void> {
    await axios.delete(`${this.storageUrl}/${key}`, {
      headers: { AccessKey: this.apiKey },
    });
  }

  getUrl(key: string): string {
    return `${this.cdnBase}/${key}`;
  }
}
