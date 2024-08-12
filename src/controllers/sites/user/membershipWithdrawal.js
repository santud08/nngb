import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { Op } from "sequelize";

/**
 * membership Withdrawl
 * @param req
 * @param res
 * @param next
 */
export const membershipWithdrawal = async (req, res, next) => {
  try {
    if (!req.userDetails) throw StatusError.badRequest(res.__("unAuthorizedAccess"));
    const userId = req.userDetails.userId;
    const checkUser = await model.db.user.findOne({
      where: { id: userId, status: { [Op.ne]: "deleted" } },
    });
    if (!checkUser) {
      throw StatusError.badRequest(res.__("user does not exist"));
    }

    if (checkUser.status === "withdrawal") {
      throw StatusError.badRequest(res.__("This user is already withdrawn"));
    }

    await model.db.user.update(
      {
        status: "withdrawal",
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
        updated_by: userId,
      },
      {
        where: {
          id: checkUser.id,
        },
      },
    );

    return res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
