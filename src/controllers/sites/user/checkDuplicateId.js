import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * checkDuplicateId
 * @param req
 * @param res
 * @param next
 */
export const checkDuplicateId = async (req, res, next) => {
  try {
    const userName = req.body.user_name ? req.body.user_name : "";
    const userId = req.body.user_id ? req.body.user_id : "";
    let conditions = { status: { [Op.ne]: "deleted" }, user_name: userName };
    if (userId) {
      conditions.id = { [Op.ne]: userId };
    }
    // Check if the ID already exists in the database
    const checkUserId = await model.db.user.findOne({
      where: conditions,
    });

    if (checkUserId) {
      throw StatusError.badRequest(res.__("user ID already exists"));
    }
    return res.ok({ message: res.__("success") });
  } catch (error) {
    next(error);
  }
};
