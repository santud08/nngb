import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { Op } from "sequelize";

/**
 * business conversion restriction Register
 * @param req
 * @param res
 * @param next
 */

export const addConversionRestrictionInfo = async (req, res, next) => {
  try {
    let reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const businessId = reqBody.business_id ? reqBody.business_id : "";
    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));
    const existingConversionRestriction = await model.db.businessConversionRestriction.findOne({
      where: { business_id: businessId, status: { [Op.ne]: "deleted" } },
    });

    if (existingConversionRestriction) {
      throw StatusError.badRequest(
        res.__(`Conversion restriction is already registered for business ID`),
      );
    }

    const businessConversionData = {
      business_id: businessId,
      required_min_cache: reqBody.required_least_cache ? reqBody.required_least_cache : "",
      required_min_unit_cache: reqBody.required_min_unit_cache
        ? reqBody.required_min_unit_cache
        : "",
      limited_max_cache: reqBody.limited_max_cache ? reqBody.limited_max_cache : null,
      unit: reqBody.limited_unit ? reqBody.limited_unit : null,
      limited_transaction_cash: reqBody.limited_ncash ? reqBody.limited_ncash : null,
      status: "active",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    const conversionRestricetion = await model.db.businessConversionRestriction.create(
      businessConversionData,
    );
    if (conversionRestricetion) {
      return res.ok({
        message: res.__("success"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
