import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import VAR from "../config/constants";

cloudinary.config({
  cloud_name: VAR.CLOUDINARY_CLOUD,
  api_key: VAR.CLOUDINARY_KEY,
  api_secret: VAR.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  if (!localFilePath) return null;

  const res = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "image",
    allowed_formats: ["png", "jpg", "gif", "mov", "webp", "webm", "wdp"],
  });

  fs.unlinkSync(localFilePath);
  return res;
};

const deleteOnCloudinary = async (assetUrl: string) => {
  if (!assetUrl) return null;

  const result = await cloudinary.uploader.upload(assetUrl, {
    resource_type: "image",
    type: "authenticated",
    invalidate: true,
  });

  return result;
};

export { uploadOnCloudinary, deleteOnCloudinary };
