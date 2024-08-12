import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { validateApiKey, validateAdminAccessToken } from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const webhardRouter = Router();

webhardRouter.post(
  "/affiliate-list",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.webhardValidation.affiliateList,
  adminController.webhardController.affiliateList,
);

webhardRouter.post(
  "/affiliate-status-update",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.webhardValidation.updateRequestStatus,
  adminController.webhardController.updateRequestStatus,
);

webhardRouter.get(
  "/affiliate-details/:vendor_id",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.webhardValidation.affiliateDetails,
  adminController.webhardController.affiliateDetails,
);

webhardRouter.post(
  "/affiliate-excel-download",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.webhardValidation.affiliateListExcelDownload,
  adminController.webhardController.affiliateListExcelDownload,
);

webhardRouter.post(
  "/affiliate-users-list",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.webhardValidation.userListForSpecificVendor,
  adminController.webhardController.userListForSpecificVendor,
);

export { webhardRouter };
