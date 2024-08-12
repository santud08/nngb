import multer from "multer";
import multerS3 from "multer-s3";
import { awsService } from "../services/index.js";
import { envs } from "../config/index.js";

const s3 = new awsService.AWS.S3();
const bucketName = envs.s3.BUCKET_NAME;
const storage = multerS3({
  s3: s3,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  bucket: function (req, file, cb) {
    const directory = `${bucketName}/uploads/survey-requests`;
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
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    //file.mimetype === "image/jpg" ||
    //file.mimetype === "image/jpeg" ||
    //file.mimetype === "image/png" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/x-hwp" ||
    file.originalname.toLowerCase().endsWith(".hwp") || // check file extension directly
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.originalname.toLowerCase().endsWith(".doc") ||
    file.originalname.toLowerCase().endsWith(".docx") ||
    file.originalname.toLowerCase().endsWith(".ppt") ||
    file.originalname.toLowerCase().endsWith(".pptx")
  ) {
    cb(null, true);
  } else {
    console.log("Please upload only ms-word, ms-ppt, pdf, or hwp file");
    return cb({
      code: "LIMIT_FILE_TYPE",
      msg: "Please upload only ms-word, ms-ppt, pdf, or hwp file",
    });
  }
};

const importFileUploadAddSurvey = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * maxFileUploadSize },
  fileFilter: fileFilter,
});
export { importFileUploadAddSurvey };
