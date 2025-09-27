import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("public/temp"));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Math.random()}-${file.originalname}-${Date.now()}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("/image")) {
    cb(null, true);
  } else {
    cb(new Error("file type not supported!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
