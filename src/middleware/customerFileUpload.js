import multer from "multer";
import { envs } from "../config/index.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customer");
  },
  filename: function (req, file, cb) {
    const fileName = "customer";
    const timestamp = Date.now();
    const randomNumbers = Math.floor(100000 + Math.random() * 900000);
    const originalName = file.originalname;
    const extension = originalName.slice(originalName.lastIndexOf("."));
    const newFileName = `${fileName}-${randomNumbers}-${timestamp}${extension}`;
    cb(null, newFileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    return cb({ code: "LIMIT_FILE_TYPE" });
  }
};
const maxFileUploadSize = envs.maxFileUploadSize ? envs.maxFileUploadSize : 20;
// function for upload file
export const customerFileUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * maxFileUploadSize },
  fileFilter: fileFilter,
});
