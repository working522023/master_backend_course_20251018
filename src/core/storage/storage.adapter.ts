export interface StorageUploadResult {
  url: string;
  key: string; // remote path
  size?: number;
  mimeType?: string;
}

export interface IStorageAdapter {
  upload(buffer: Buffer, fileName: string, directory?: string): Promise<StorageUploadResult>;
  delete(key: string): Promise<void>;
  getUrl(key: string): string;
}
