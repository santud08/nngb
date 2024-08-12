import bcrypt from "bcrypt";
import { adminUserService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * loginExternalIp
 * User loing after verify when request from external ip
 * @param req
 * @param res
 * @param next
 */
export const loginExternalIp = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userName = reqBody.user_name ? reqBody.user_name : "";
    const userType = reqBody.user_type ? reqBody.user_type : "";
    const userPhone = reqBody.phone ? reqBody.phone : "";

    const userDetails = await adminUserService.getByUserNameAndUserType(userName, userType);

    if (!userDetails) {
      throw StatusError.badRequest({ user_name: res.__("user does not exist") });
    }

    const isSame = await bcrypt.compare(reqBody.password, userDetails.passwd);

    if (!isSame) {
      throw StatusError.badRequest({ password: res.__("Password does not match") });
    }

    if (userDetails.status === "inactive") {
      throw StatusError.badRequest({ user_name: res.__("user is inactive") });
    } else if (userDetails.status === "blocked") {
      throw StatusError.badRequest({ user_name: res.__("user is blocked") });
    }

    if (userDetails.phone !== userPhone) {
      throw StatusError.badRequest({ phone: res.__("phone number not matched") });
    }

    const result = await adminUserService.generateTokens(userDetails.email, userDetails.user_type);

    return res.ok({
      message: res.__("success"),
      user_id: userDetails.id,
      username: userDetails.user_name,
      email: userDetails.email,
      token: result.access_token,
      token_expiry: result.access_token_expiry,
    });
  } catch (error) {
    next(error);
  }
};
