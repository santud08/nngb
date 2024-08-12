import { envs } from "../../config/index.js";

/*
 * generateNpUrl
 * generate the nice pay phone verification url
 * params - req, type(success/error)
 * return url as string
 */

export const generateNicePayPhoneVerificationUrl = async (req, type) => {
  let retUrl = "";
  if (
    envs.NICE_TOKEN_API.RETURN_URL &&
    envs.NICE_TOKEN_API.RETURN_URL != "" &&
    envs.NICE_TOKEN_API.RETURN_URL != null &&
    envs.NICE_TOKEN_API.RETURN_URL != "undefined" &&
    type == "success"
  ) {
    retUrl = `${envs.NICE_TOKEN_API.RETURN_URL}`;
  } else if (
    envs.NICE_TOKEN_API.ERROR_URL &&
    envs.NICE_TOKEN_API.ERROR_URL != "" &&
    envs.NICE_TOKEN_API.ERROR_URL != null &&
    envs.NICE_TOKEN_API.ERROR_URL != "undefined" &&
    type == "error"
  ) {
    retUrl = `${envs.NICE_TOKEN_API.ERROR_URL}`;
  } else {
    if (type == "success") {
      retUrl = req.protocol + "://" + req.get("host") + "/api/v1/auth/phone-auth-success";
    }
    if (type == "error") {
      retUrl = req.protocol + "://" + req.get("host") + "/api/v1/auth/phone-auth-failure";
    }
  }
  return retUrl;
};
