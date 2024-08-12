import { userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * socialLogin
 * @param req
 * @param res
 * @param next
 */
export const socialLogin = async (req, res, next) => {
  try {
    const reqBody = req.body;
    // get user details by email
    const email = reqBody.email ? reqBody.email : "";
    const userDetails = await userService.getByEmail(email);

    if (!userDetails) {
      throw StatusError.badRequest({ email: res.__("email does not exists") });
    }

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

    const result = await userService.generateTokens(userDetails.email, reqBody.acquisition_channel);
    const userdetail = {
      message: res.__("Login successful"),
      user_id: userDetails.id,
      username: userDetails.user_name,
      email: userDetails.email,
      token: result.access_token,
      token_expiry: result.access_token_expiry,
      login_from: reqBody.login_from,
    };

    return res.ok({
      results: userdetail,
    });
  } catch (error) {
    next(error);
  }
};
