import fs from "fs";
import axios from "axios";
import path from "path";
import { retry } from "../retry";
import { logger } from "../../../core/configs/logger";
import { StorageAdapter, UploadResult } from "../../interfaces";
import { StorageException } from "../../../core";

const storageLogger = logger.child({ scope: "BunnyStorage" });

export class BunnyStorage implements StorageAdapter {
  private baseUrl: string;

  constructor(
    private options: {
      storageZone: string;
      apiKey: string;
      region: string;
    }
  ) {
    this.baseUrl = `https://${options.region}.storage.bunnycdn.com/${options.storageZone}`;
  }

  async upload(localPath: string, remotePath: string): Promise<UploadResult> {
    const file = fs.readFileSync(localPath);

    const uploadFn = async () => {
      return axios.put(`${this.baseUrl}/${remotePath}`, file, {
        headers: {
          AccessKey: this.options.apiKey,
          "Content-Type": "application/octet-stream",
        },
      });
    };

    try {
      await retry(uploadFn, 3, 600);

      storageLogger.info("Upload success", { path: remotePath });

      return {
        url: `${this.baseUrl}/${remotePath}`,
        path: remotePath,
        size: file.length,
      };
    } catch (err) {
      storageLogger.error("Upload failed", { err, remotePath });

      throw new StorageException("Upload failed", "UPLOAD_FAILED", err);
    } finally {
      fs.unlink(localPath, () => {}); // clean up local file
    }
  }

  async delete(remotePath: string): Promise<boolean> {
    const deleteFn = async () =>
      axios.delete(`${this.baseUrl}/${remotePath}`, {
        headers: { AccessKey: this.options.apiKey },
      });

    try {
      await retry(deleteFn);

      storageLogger.info("Delete success", { path: remotePath });

      return true;
    } catch (err) {
      storageLogger.error("Delete failed", { err, remotePath });

      throw new StorageException("Delete failed", "DELETE_FAILED", err);
    }
  }

  async exists(remotePath: string): Promise<boolean> {
    try {
      await axios.head(`${this.baseUrl}/${remotePath}`, {
        headers: { AccessKey: this.options.apiKey },
      });

      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(remotePath: string): string {
    return `${this.baseUrl}/${remotePath}`;
  }
}
