import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { adminValidation } from "../../validations/index.js";
import { validateApiKey, validateAdminAccessToken } from "../../middleware/index.js";
// import { adminValidation } from "../../validations/index.js";

const siteRouter = Router();

siteRouter.get(
  "/download/file",
  adminValidation.downloadValidation.fileDownload,
  adminController.downloadController.fileDownload,
);

siteRouter.get(
  "/jobs",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.jobList,
);

siteRouter.get(
  "/regions",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.regionList,
);

siteRouter.get(
  "/team-list",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.teamList,
);

siteRouter.get(
  "/btype",
  validateApiKey,
  validateAdminAccessToken,
  adminController.businessController.businessTypeList,
);

siteRouter.get(
  "/gubun",
  validateApiKey,
  validateAdminAccessToken,
  adminController.businessController.gubunList,
);

siteRouter.get(
  "/vendor",
  validateApiKey,
  validateAdminAccessToken,
  adminController.businessController.vendorList,
);
siteRouter.get(
  "/teams",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.teamList,
);

siteRouter.get(
  "/bu-list",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.buList,
);

siteRouter.get(
  "/headquarter-list",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.headquarterList,
);

export { siteRouter };
