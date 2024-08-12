import bcrypt from "bcrypt";
import { adminUserService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";

/**
 * User login
 * @param req
 * @param res
 * @param next
 */
export const login = async (req, res, next) => {
  try {
    const reqBody = req.body;
    // get user details by email
    const userName = reqBody.user_name ? reqBody.user_name : "";
    const userType = reqBody.user_type ? reqBody.user_type : "";
    const userIp = reqBody.user_ip ? reqBody.user_ip : "";

    const userDetails = await adminUserService.getByUserNameAndUserType(userName, userType);

    if (!userDetails) {
      throw StatusError.badRequest({ user_name: res.__("user does not exists") });
    }

    // comparing the password:
    const isSame = await bcrypt.compare(reqBody.password, userDetails.passwd);
    if (!isSame) throw StatusError.badRequest({ password: res.__("Password does not match") });

    const userIpAccessList = await models.db.ipAccessMapping.findOne({
      where: { status: "active", ip: userIp },
    });
    if (!userIpAccessList) throw StatusError.badRequest({ externalIP: res.__("external ip") });

    if (userDetails.status == "inactive") {
      throw StatusError.badRequest({ user_name: res.__("user is inactive") });
    } else if (userDetails.status == "blocked") {
      throw StatusError.badRequest({ user_name: res.__("user is blocked.") });
    }

    // generating the tokens "acquisition_channel": "smart_panel"
    // const result = await userService.generateTokens(userDetails.email, userDetails.acquisition_channel,userDetails.user_name);

    const result = await adminUserService.generateTokens(userDetails.email, userDetails.user_type);

    return res.ok({
      message: res.__("success"),
      user_id: userDetails.id,
      user_name: userDetails.user_name,
      email: userDetails.email,
      token: result.access_token,
      token_expiry: result.access_token_expiry,
    });
  } catch (error) {
    next(error);
  }
};
