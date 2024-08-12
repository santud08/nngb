import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { Op } from "sequelize";

/**
 * Update business conversion restriction
 * @param req
 * @param res
 * @param next
 */
export const updateConversionRestrictionInfo = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const restrictionId = reqBody.id ? reqBody.id : "";
    if (!restrictionId) throw StatusError.badRequest(res.__("Restriction ID is required"));

    const existingConversionRestriction = await model.db.businessConversionRestriction.findOne({
      where: {
        business_id: reqBody.business_id,
        id: restrictionId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!existingConversionRestriction)
      throw StatusError.badRequest(res.__("Invalid Restriction ID"));

    const updateData = {
      business_id: reqBody.business_id,
      required_min_cache: reqBody.required_least_cache ? reqBody.required_least_cache : "0",
      required_min_unit_cache: reqBody.required_min_unit_cache
        ? reqBody.required_min_unit_cache
        : "0",
      limited_max_cache: reqBody.limited_max_cache ? reqBody.limited_max_cache : null,
      unit: reqBody.limited_unit ? reqBody.limited_unit : null,
      limited_transaction_cash: reqBody.limited_ncash ? reqBody.limited_ncash : "0",
      status: "active",
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    //console.log(updateData);
    const [rowsAffected] = await model.db.businessConversionRestriction.update(updateData, {
      where: { id: restrictionId },
    });

    if (rowsAffected === 1) {
      return res.ok({
        message: res.__("success"),
      });
    } else {
      throw StatusError.badRequest(res.__("invalidId"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
