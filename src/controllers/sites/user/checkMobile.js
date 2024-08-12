import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * checkMobile
 * @param req
 * @param res
 * @param next
 */
export const checkMobile = async (req, res, next) => {
  try {
    const mobile = req.body.mobile;
    const userId = req.body.user_id ? req.body.user_id : null;
    let conditions = { status: { [Op.ne]: "deleted" }, mobile: mobile };

    if (userId) {
      conditions.id = { [Op.ne]: userId };
    }

    const isExists = await model.db.user.findOne({
      where: conditions,
    });
    if (isExists) throw StatusError.badRequest(res.__("This mobile is already registered"));

    return res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
