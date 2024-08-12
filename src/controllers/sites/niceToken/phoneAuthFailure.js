import { StatusError } from "../../../config/index.js";
import { niceResponseService } from "../../../services/index.js";

/**
 * Get nice token api
 * @param req
 * @param res
 * @param next
 */

export const phoneAuthFailure = async (req, res, next) => {
  try {
    const sEncData = req.body.EncodeData;
    const resData = await niceResponseService.niceResponseService(sEncData, "failure");

    if (resData.status == "success") {
      res.ok({ result: resData.userInfo });
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
