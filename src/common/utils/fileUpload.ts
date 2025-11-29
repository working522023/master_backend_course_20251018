import axios from "axios";
import fs from "fs";
import { BunnyOptions } from "../interfaces";

export const uploadToBunny = async (
  localFilePath: string,
  remoteFileName: string,
  options: BunnyOptions
): Promise<string> => {
  const { storageZone, apiKey, region = "sg", directory = "" } = options;

  const stream = fs.createReadStream(localFilePath);

  // Construct upload URL
  const uploadUrl = `https://${region}.storage.bunnycdn.com/${storageZone}/${directory}/${remoteFileName}`;

  await axios.put(uploadUrl, stream, {
    headers: {
      AccessKey: apiKey,
      "Content-Type": "application/octet-stream",
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  return `https://${storageZone}.b-cdn.net/${directory}/${remoteFileName}`;
};

export const deleteFromBunny = async (
  remoteFileUrl: string,
  options: BunnyOptions
) => {
  const { storageZone, apiKey, region = "sg" } = options;

  const url = new URL(remoteFileUrl);
  const filePath = url.pathname.replace(/^\/+/, "");

  console.log({url, filePath});
  

  // Delete request to Bunny
  const deleteUrl = `https://${region}.storage.bunnycdn.com/${storageZone}/${filePath}`;
  await axios.delete(deleteUrl, {
    headers: { AccessKey: apiKey },
  });
  console.log("Delete from Bunny");

  return true;
};
