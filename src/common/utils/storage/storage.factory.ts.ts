import { StorageAdapter } from "../../interfaces";
import { BunnyStorage } from "./bunny.storage";

export class StorageFactory {
  static create(): StorageAdapter {
    const provider = process.env.STORAGE_PROVIDER ?? "bunny";

    switch (provider) {
      case "bunny":
        return new BunnyStorage({
          storageZone: process.env.BUNNY_STORAGE_ZONE!,
          apiKey: process.env.BUNNY_API_KEY!,
          region: process.env.BUNNY_REGION ?? "sg",
        });

      default:
        throw new Error(`Unknown storage provider: ${provider}`);
    }
  }
}