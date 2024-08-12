import { StatusError } from "../config/index.js";
import { adminMenuAccessControlService } from "../services/index.js";

/**
 * This function is used for validating access control for super admin
 * @param req
 * @param res
 * @param next
 */
export const adminUserAccessControl = (menu = null, section = null, action = null) => {
  return async (req, res, next) => {
    try {
      const userId = req.userDetails.userId ? req.userDetails.userId : "";
      const userType = req.userDetails.user_type ? req.userDetails.user_type : "";
      //const ipAccessType = req.userDetails.ip_access_type ? req.userDetails.ip_access_type : "";

      if (!userId) throw StatusError.unauthorized("");
      if (!userType) throw StatusError.unauthorized("");
      if (!menu) throw StatusError.unauthorized("");

      const check = await adminMenuAccessControlService.checkUserAccess(userId, menu);
      if (!check) {
        throw StatusError.unauthorized("You have no permission to access this section");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
