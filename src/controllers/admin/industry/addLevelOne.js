import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * Add level one industry
 * @param req
 * @param res
 * @param next
 */

export const addLevelOneIndustry = async (req, res, next) => {
  try {
    let reqBody = req.body;

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const industryData = {
      industry_name: reqBody.industry_name ? reqBody.industry_name : "",
      industry_step: reqBody.industry_step,
      status: "active",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    console.log(industryData);
    const affectedData = await model.db.industry.create(industryData);
    if (affectedData) {
      return res.ok({
        message: res.__("success"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
