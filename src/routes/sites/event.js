import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const eventRouter = Router();


eventRouter.post(
  "/",
  validateApiKey,
  validateAccessToken,  
  siteController.eventController.getAllEvent,
);

eventRouter.get(
  "/get/:eventId",
  validateApiKey,
  validateAccessToken,
  siteController.eventController.viewEvent,
);



export { eventRouter };
