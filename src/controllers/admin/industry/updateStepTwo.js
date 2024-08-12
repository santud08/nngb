import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * update step two
 * @param req
 * @param res
 * @param next
 */
export const updateStepTwo = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const industryId = req.body.id;
    const isExists = await model.db.industry.findOne({
      where: { id: industryId, status: { [Op.ne]: "deleted" }, industry_step: "step_2" },
    });
    if (!isExists) {
      throw StatusError.badRequest(res.__("Not Exists"));
    }
    // prepare data for insertion
    const data = {
      industry_name: reqBody.industry_name,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    await model.db.industry.update(data, {
      where: {
        id: industryId,
      },
    });

    res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
