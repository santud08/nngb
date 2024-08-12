import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * checkEmail
 * @param req
 * @param res
 * @param next
 */
export const checkEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userId = req.body.user_id ? req.body.user_id : null;
    let conditions = { status: { [Op.ne]: "deleted" }, email: email };
    if (userId) {
      conditions.id = { [Op.ne]: userId };
    }
    const isExists = await model.db.user.findOne({
      where: conditions,
    });
    if (isExists) throw StatusError.badRequest(res.__("This email is already registered"));

    return res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
