import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { customFileHelper } from "../../helpers/index.js";
import {
  importFileUploadSubProject,
  validateAccessToken,
  validateApiKey,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const subProjectRouter = Router();

subProjectRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,

  customFileHelper.customFileUpload(importFileUploadSubProject.array("file_upload", 1)),

  adminValidation.subProject.addSubProject,
  adminController.subProject.addSubProject,
);

export { subProjectRouter };
