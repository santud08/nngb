import * as model from "../../../models/index.js";
import { Sequelize } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * profileDetails
 * @param req
 * @param res
 * @param next
 */
export const profileDetails = async (req, res, next) => {
  try {
    const id = req.userDetails.userId ? req.userDetails.userId : null;
    if (!id) throw StatusError.badRequest("invalidId");
    const userDetails = await model.db.user.findOne({
      where: { status: "active", id: id },
      attributes: [["id", "user_id"], "user_name", "referral_id"],
      raw: true,
    });
    if (!userDetails) throw StatusError.badRequest(res.__("User not available"));
    const cashResult = await model.db.cashHistory.findOne({
      attributes: [[Sequelize.fn("MAX", Sequelize.col("total_cash")), "earned_cash"]],
      where: {
        ucode: id,
        status: "active",
      },
      raw: true,
    });

    return res.ok({ ...userDetails, ...cashResult });
  } catch (error) {
    next(error);
  }
};
