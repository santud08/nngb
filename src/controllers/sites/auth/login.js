import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * User login
 * @param req
 * @param res
 * @param next
 */
export const login = async (req, res, next) => {
  try {
    const reqBody = req.body;
    // get user details by user_name
    const userName = reqBody.user_name ? reqBody.user_name : "";
    const userDetails = await userService.getByUsername(userName);

    if (!userDetails) {
      throw StatusError.badRequest({ user_name: res.__("user does not exists") });
    }
    // comparing the password:
    const isSame = await bcrypt.compare(reqBody.password, userDetails.password);
    if (!isSame) throw StatusError.badRequest({ password: res.__("Password does not match") });

    if (userDetails.status == "inactive") {
      throw StatusError.badRequest({ user_name: res.__("user is inactive") });
    } else if (userDetails.status == "blocked") {
      throw StatusError.badRequest({ user_name: res.__("user is blocked.") });
    } else if (userDetails.status == "withdrawal") {
      throw StatusError.badRequest({
        user_name: res.__(
          "Your account has been withdrawn. Please contact the administrator for assistance.",
        ),
      });
    }

    const result = await userService.generateTokens(
      userDetails.email,
      reqBody.acquisition_channel ? reqBody.acquisition_channel : "netpoint",
    );
    const userdetail = {
      message: res.__("Login successful"),
      user_id: userDetails.id,
      username: userDetails.user_name,
      email: userDetails.email,
      // profile_image: userDetails.profile_image,
      token: result.access_token,
      token_expiry: result.access_token_expiry,
    };

    return res.ok({
      results: userdetail,
    });
  } catch (error) {
    next(error);
  }
};
