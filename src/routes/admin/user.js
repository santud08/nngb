import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const userRouter = Router();

userRouter.post(
  "/admin/user-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.adminUserList,
  adminController.userController.adminUserList,
);

userRouter.post(
  "/admin/update-profile",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.userValidation.updateAdminProfile,
  adminController.userController.updateAdminProfile,
);

userRouter.get(
  "/admin/profile/details",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.adminProfileDetails,
);

userRouter.post(
  "/admin/user/change-password",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.userValidation.changeAdminPassword,
  adminController.userController.changeAdminPassword,
);

userRouter.get(
  "/admin/user-details",
  validateApiKey,
  validateAdminAccessToken,
  // adminUserAccessControl("management"),
  adminValidation.userValidation.adminUserDetails,
  adminController.userController.adminUserDetails,
);

userRouter.get(
  "/departments",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminController.userController.departmentList,
);

userRouter.get(
  "/admin/user-details",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.adminUserDetails,
  adminController.userController.adminUserDetails,
);

userRouter.post(
  "/admin/save-user",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.saveAdminUser,
  adminController.userController.saveAdminUser,
);

userRouter.post(
  "/admin/update-user",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.updateAdminUser,
  adminController.userController.updateAdminUser,
);

userRouter.post(
  "/admin/delete-user",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.deleteAdminUser,
  adminController.userController.deleteAdminUser,
);

userRouter.post(
  "/member-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.userValidation.memberList,
  adminController.userController.memberList,
);

userRouter.get(
  "/member-details",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.userValidation.memberDetails,
  adminController.userController.memberDetails,
);

userRouter.get(
  "/member-statistics",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.userValidation.memberStatistics,
  adminController.userController.memberStatistics,
);

userRouter.post(
  "/check-email",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.checkEmail,
  adminController.userController.checkEmail,
);

userRouter.post(
  "/check-duplicate-id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.checkDuplicateId,
  adminController.userController.checkDuplicateId,
);

userRouter.post(
  "/admin/external-user-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.externalAdminUserList,
  adminController.userController.externalAdminUserList,
);

userRouter.get(
  "/admin/external-user-details",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.externalAdminUserDetails,
  adminController.userController.externalAdminUserDetails,
);

userRouter.get(
  "/admin/delete-external-user",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.deleteExternalAdminUser,
  adminController.userController.deleteExternalAdminUser,
);

userRouter.post(
  "/admin/update-external-user",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.updateExternalAdminUser,
  adminController.userController.updateExternalAdminUser,
);

userRouter.get(
  "/admin/search-result-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("management"),
  adminValidation.userValidation.searchByKeyword,
  adminController.userController.searchByKeyword,
);
export { userRouter };
