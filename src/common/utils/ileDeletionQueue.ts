import fs from "fs";
import { logger } from "../../core";

interface QueueItem {
  path: string;
  retries?: number;
}

const queue: QueueItem[] = [];
let processing = false;
const MAX_RETRIES = 3;

export const enqueueFileDeletion = (filePath: string) => {
  queue.push({ path: filePath, retries: 0 });
  processQueue();
};

const processQueue = async () => {
  if (processing) return;
  processing = true;

  while (queue.length) {
    const item = queue.shift();
    if (!item) continue;

    try {
      if (fs.existsSync(item.path)) {
        fs.unlinkSync(item.path);
        logger.info(`Deleted local file: ${item.path}`);
      }
    } catch (err) {
      item.retries! += 1;
      if (item.retries! <= MAX_RETRIES) {
        queue.push(item);
        logger.warn(`Retry deleting file: ${item.path}, attempt ${item.retries}`);
      } else {
        logger.error(`Failed to delete local file after retries: ${item.path}`);
      }
    }
  }

  processing = false;
};
