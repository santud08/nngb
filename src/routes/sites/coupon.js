import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";
// import { siteValidation } from "../../validations/index.js";
const couponRouter = Router();

couponRouter.post(
  "/check-dev-internet-network",
  validateApiKey,
  siteController.couponController.checkDevInternalNetwork,
);
couponRouter.post(
  "/check-dev-official-network",
  validateApiKey,
  siteController.couponController.checkDevOfficialNetwork,
);
couponRouter.post(
  "/check-operate-network",
  validateApiKey,
  siteController.couponController.checkOperateNetwork,
);
couponRouter.post(
  "/check-operate-public-network",
  validateApiKey,
  siteController.couponController.checkOperatePublicNetwork,
);

couponRouter.post("/inquiry", validateApiKey, siteController.couponController.couponInquiry);
couponRouter.post("/history", validateApiKey, siteController.couponController.couponHistory);
couponRouter.post("/issuence", validateApiKey, siteController.couponController.issuenceOfCoupon);

export { couponRouter };
