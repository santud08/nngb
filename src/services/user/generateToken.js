import jwt from "jsonwebtoken";
import { envs } from "../../config/index.js";

/**
 * Generate access token
 * @param details
 */
export const generateTokens = async (email, login_acquisition_channel) => {
  const accessToken = jwt.sign({ email, login_acquisition_channel }, envs.jwt.accessToken.secret, {
    expiresIn: envs.jwt.accessToken.expiry,
  });

  return {
    access_token: accessToken,
    access_token_expiry: envs.jwt.accessToken.expiry,
  };
};
