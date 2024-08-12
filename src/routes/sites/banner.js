import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const bannerRouter = Router();

bannerRouter.post(
  "/",
  validateApiKey,
  validateAccessToken,
  siteValidation.bannerValidation.getAllBanner,
  siteController.bannerController.getAllBanner,
);
bannerRouter.post(
  "/click-count",
  validateApiKey,
  validateAccessToken,
  siteController.bannerController.clickCount,
);

export { bannerRouter };
