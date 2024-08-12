import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const authRouter = Router();

authRouter.post(
  "/login",
  validateApiKey,
  siteValidation.authValidation.userLogin,
  siteController.authController.login,
);

authRouter.post(
  "/find-id",
  validateApiKey,
  siteValidation.authValidation.findId,
  siteController.authController.findId,
);

authRouter.post(
  "/find-password",
  validateApiKey,
  siteValidation.authValidation.findPassword,
  siteController.authController.findPassword,
);

authRouter.post(
  "/signup",
  validateApiKey,
  siteValidation.authValidation.userSignup,
  siteController.authController.signup,
);

authRouter.post(
  "/check-referral-id",
  validateApiKey,
  siteValidation.authValidation.checkUserReferralId,
  siteController.authController.checkUserReferralId,
);

authRouter.post(
  "/verify-email",
  validateApiKey,
  siteValidation.authValidation.emailVerify,
  siteController.authController.emailVerify,
);

authRouter.post(
  "/social-login",
  validateApiKey,
  siteValidation.authValidation.socialLogin,
  siteController.authController.socialLogin,
);

//

authRouter.post(
  "/send-reset-verification-code",
  validateApiKey,
  siteValidation.authValidation.sendVerificationCodeToEmail,
  siteController.authController.sendVerificationCodeToEmail,
);

authRouter.post(
  "/check-verification-code",
  validateApiKey,
  siteValidation.authValidation.checkVerificationCode,
  siteController.authController.checkVerificationCode,
);

authRouter.post(
  "/change-password",
  validateApiKey,
  siteValidation.authValidation.changePassword,
  siteController.authController.changePassword,
);

export { authRouter };
