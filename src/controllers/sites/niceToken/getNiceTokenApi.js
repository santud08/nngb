import { StatusError } from "../../../config/index.js";
import { niceTokenService } from "../../../services/index.js";

/**
 * Get nice token api
 * @param req
 * @param res
 * @param next
 */
export const getNiceTokenApi = async (req, res, next) => {
  try {
    const resData = await niceTokenService.niceToken();
    if (resData && resData.status && resData.status == "success" && resData.tokenInfo) {
      res.ok({ result: resData.tokenInfo });
    } else {
      if (resData.error.sRtnMSG) {
        resData.error.sRtnMSG = res.__(resData.error.sRtnMSG);
      }

      throw StatusError.badRequest(resData.error);
    }
  } catch (error) {
    next(error);
  }
};
