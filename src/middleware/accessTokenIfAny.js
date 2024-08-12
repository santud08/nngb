import { userService } from "../services/index.js";
import { envs } from "../config/index.js";

/**
 * This function is used for validating authorization header if login
 * @param req
 * @param res
 * @param next
 */
export const accessTokenIfAny = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
      if (decodedData) {
        const userDetails = await userService.getByEmail(decodedData.email);
        if (userDetails) {
          req["userDetails"] = {
            userId: userDetails.id,
            name: userDetails.name,
            email: userDetails.email,
            acquisition_channel: userDetails.acquisition_channel,
            login_acquisition_channel: decodedData.login_acquisition_channel,
          };
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
