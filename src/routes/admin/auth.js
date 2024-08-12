import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const authRouter = Router();

authRouter.post(
  "/login",
  validateApiKey,
  adminValidation.authValidation.adminLogin,
  adminController.authController.login,
);
authRouter.post(
  "/login-external-ip",
  validateApiKey,
  adminValidation.authValidation.adminLoginExIp,
  adminController.authController.loginExternalIp,
);

authRouter.post(
  "/find-password",
  validateApiKey,
  adminValidation.authValidation.findPassword,
  adminController.authController.findPassword,
);
authRouter.get("/user-delete", adminController.authController.userDelete);
export { authRouter };
