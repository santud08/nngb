import jwt from "jsonwebtoken";
import { envs } from "../../config/index.js";

/**
 * Generate admin access token
 * @param details
 */
export const generateTokens = async (email, userType) => {
  const accessToken = jwt.sign({ email, user_type: userType }, envs.jwt.accessToken.secret, {
    expiresIn: envs.jwt.accessToken.expiry,
  });

  return {
    access_token: accessToken,
    access_token_expiry: envs.jwt.accessToken.expiry,
  };
};
