import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const inquiryRouter = Router();

inquiryRouter.post(
  "/",
  validateApiKey,
  validateAccessToken,
  siteValidation.inquiryValidation.getAllInquiry,
  siteController.inquiryController.getAllInquiry,
);

inquiryRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,
  siteValidation.inquiryValidation.addInquiry,
  siteController.inquiryController.addInquiry,
);

inquiryRouter.get(
  "/details/:id",
  validateApiKey,
  validateAccessToken,
  siteValidation.inquiryValidation.viewInquiry,
  siteController.inquiryController.viewInquiry,
);

inquiryRouter.get(
  "/category",
  validateApiKey,
  validateAccessToken,
  siteValidation.inquiryValidation.inquiryCategoryList,
  siteController.inquiryController.inquiryCategoryList,
);

export { inquiryRouter };
