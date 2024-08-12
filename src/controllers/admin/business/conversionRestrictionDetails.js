import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Get conversion restriction details by business_id
 * @param req
 * @param res
 */
export const conversionRestrictionDetails = async (req, res, next) => {
  try {
    const businessId = req.query.business_id ? req.query.business_id : null;
    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));
    const getConversionRestriction = await models.db.businessConversionRestriction.findOne({
      where: {
        business_id: businessId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getConversionRestriction) throw StatusError.badRequest("invalidId");

    const conditions = { business_id: businessId, status: { [Op.ne]: "deleted" } };
    const selectAttributes = [
      ["id", "restriction_id"],
      "business_id",
      ["required_min_cache", "required_least_cache"],
      ["required_min_unit_cache", "required_min_unit_cache"],
      ["limited_max_cache", "limited_max_cache"],
      ["unit", "limited_unit"],
      ["limited_transaction_cash", "limited_ncash"],
    ];

    const resultData = await models.db.businessConversionRestriction.findOne({
      where: conditions,
      attributes: selectAttributes,
    });

    return res.ok(resultData);
  } catch (error) {
    next(error);
  }
};
