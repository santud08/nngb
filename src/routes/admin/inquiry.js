import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const inquiryRouter = Router();

inquiryRouter.post(
  "/reply",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.inquiryValidation.adminReply,
  adminController.inquiryController.adminReply,
);

inquiryRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.inquiryValidation.getAllInquiry,
  adminController.inquiryController.getAllInquiry,
);

inquiryRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.inquiryValidation.viewInquiry,
  adminController.inquiryController.viewInquiry,
);

inquiryRouter.get(
  "/categories",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminController.inquiryController.inquiryCategoryList,
);
export { inquiryRouter };
