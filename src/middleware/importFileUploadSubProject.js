import multer from "multer";
import multerS3 from "multer-s3";
import { envs } from "../config/index.js";
import { awsService } from "../services/index.js";

const s3 = new awsService.AWS.S3();
const bucketName = envs.s3.BUCKET_NAME;
const storage = multerS3({
  s3: s3,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  bucket: function (req, file, cb) {
    const directory = `${bucketName}/uploads/subprojects`;
    cb(null, directory);
  },
  key: function (req, file, cb) {
    const fileName = file.originalname.split(".").shift();
    const timestamp = Date.now();
    const randomNumbers = Math.floor(100000 + Math.random() * 900000);
    const originalName = file.originalname;
    const extension = originalName.slice(originalName.lastIndexOf("."));
    const newFileName = `${fileName}-${randomNumbers}-${timestamp}${extension}`;
    cb(null, newFileName);
  },
});

const maxFileUploadSize = envs.maxFileUploadSize ? envs.maxFileUploadSize : 20;

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.originalname.toLowerCase().endsWith(".jpg") ||
    file.originalname.toLowerCase().endsWith(".jpeg") ||
    file.originalname.toLowerCase().endsWith(".png")
  ) {
    cb(null, true);
  } else {
    console.log("Please upload only jpg, jpeg, png");
    return cb({
      code: "LIMIT_FILE_TYPE",
      msg: "Please upload only jpg, jpeg, png",
    });
  }
};

const importFileUploadSubProject = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * maxFileUploadSize },
  fileFilter: fileFilter,
});
export { importFileUploadSubProject };
