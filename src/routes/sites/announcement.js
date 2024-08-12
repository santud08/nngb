import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";

const announcementRouter = Router();

announcementRouter.post(
  "/",
  validateApiKey,
  siteController.announcementController.getAnnouncements,
);

export { announcementRouter };
