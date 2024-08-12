import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";

/**
 * checkUserReferralId
 * @param req
 * @param res
 * @param next
 */
export const checkUserReferralId = async (req, res, next) => {
  try {
    const referralId = req.body.referral_id ? req.body.referral_id : "";
    const checkUserRefID = await model.db.user.findOne({
      where: { status: "active", referral_id: referralId },
    });
    if (!checkUserRefID) throw StatusError.badRequest(res.__("This referral id is not available"));

    return res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
