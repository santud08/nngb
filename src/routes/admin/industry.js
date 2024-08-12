import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  adminUserAccessControl,
  validateAdminAccessToken,
  validateApiKey,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const industryRouter = Router();

/*industry level one list*/
industryRouter.post(
  "/level-one-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.getLevelOneIndustryList,
  adminController.industryController.getLevelOneIndustryList,
);

/*industry step two list*/
industryRouter.post(
  "/step-two-list",
  validateApiKey,
  validateAdminAccessToken,
  //adminUserAccessControl("project_management"),
  adminValidation.industryValidation.getStepTwoIndustryList,
  adminController.industryController.getStepTwoIndustryList,
);

/*industry add*/
industryRouter.post(
  "/add-level-one",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.addLevelOneIndustry,
  adminController.industryController.addLevelOneIndustry,
);
/*industry step two*/
industryRouter.post(
  "/add-step-two",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.addStepTwoIndustry,
  adminController.industryController.addStepTwoIndustry,
);

//industry level one update
industryRouter.post(
  "/update-level-one",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.updateLevelOne,
  adminController.industryController.updateLevelOne,
);

//industry step two update
industryRouter.post(
  "/update-step-two",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.updateStepTwo,
  adminController.industryController.updateStepTwo,
);

//delete industry
industryRouter.post(
  "/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminValidation.industryValidation.deleteIndustry,
  adminController.industryController.deleteIndustry,
);
export { industryRouter };

