import { userService } from "../services/index.js";
import { envs, StatusError } from "../config/index.js";

/**
 * This function is used for validating authorization header
 * @param req
 * @param res
 * @param next
 */
export const validateAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) throw StatusError.forbidden("");

    const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
    if (!decodedData) throw StatusError.unauthorized("");

    const userDetails = await userService.getByActiveEmail(decodedData.email);
    if (!userDetails) throw StatusError.unauthorized("");

    req["userDetails"] = {
      userId: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      user_type: userDetails.user_type,
      acquisition_channel: userDetails.acquisition_channel,
      login_acquisition_channel: decodedData.login_acquisition_channel,
    };
    next();
  } catch (error) {
    next(error);
  }
};
