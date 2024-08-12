import * as models from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import { Op } from "sequelize";

/**
 * bankList
 * @param req
 * @param res
 */
export const bankList = async (req, res, next) => {
  try {
    const results = await models.db.bankList.findAll({
      attributes: ["id", "bank_name", "branch_name", "bank_code", "branch_address"],
      where: { status: { [Op.ne]: "deleted" } },
    });
    if (!results) throw StatusError.badRequest(res.__("No Bank List Found!"));
    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
