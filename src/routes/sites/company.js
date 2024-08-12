import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";

const companyRouter = Router();

companyRouter.post("/get", validateApiKey, siteController.companyController.viewCompany);

export { companyRouter };
