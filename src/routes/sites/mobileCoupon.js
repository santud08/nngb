import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";
const mobileCouponRouter = Router();

mobileCouponRouter.post("/", validateApiKey, siteController.mobileCouponsController.getCoupons);

mobileCouponRouter.get(
  "/view/:id",
  validateApiKey,
  siteController.mobileCouponsController.viewCoupon,
);

mobileCouponRouter.post(
  "/get-ticket-category",
  validateApiKey,
  siteController.mobileCouponsController.getCategories,
);

export { mobileCouponRouter };
