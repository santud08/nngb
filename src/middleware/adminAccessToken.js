import { adminUserService } from "../services/index.js";
import { envs, StatusError } from "../config/index.js";

/**
 * This function is used for validating authorization header
 * @param req
 * @param res
 * @param next
 */
export const validateAdminAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) throw StatusError.forbidden("");

    const decodedData = adminUserService.verifyToken(token, envs.jwt.accessToken.secret);
    if (!decodedData) throw StatusError.unauthorized("");

    const userDetails = await adminUserService.getByEmail(decodedData.email);

    if (!userDetails) throw StatusError.unauthorized("");

    req["userDetails"] = {
      userId: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      user_type: userDetails.user_type,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
