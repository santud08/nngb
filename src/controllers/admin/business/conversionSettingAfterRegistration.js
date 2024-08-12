import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * conversionSettingAfterRegistration
 * @param req
 * @param res
 */
export const conversionSettingAfterRegistration = async (req, res, next) => {
  try {
    const customerId = req.body.customer_id ? req.body.customer_id : null;
    const businessId = req.body.business_id ? req.body.business_id : null;
    if (!customerId) throw StatusError.badRequest(res.__("invalidId"));

    const business = await models.db.business.findOne({
      where: {
        id: businessId,
        vendor_id: customerId,
        status: { [Op.ne]: "deleted" },
      },
      attributes: [
        "module_format",
        "is_confirm",
        "encryption_format",
        "encryption_key",
        "connection_url",
        "authentication_method", //i,p
        "conversion_rate_from",
        "conversion_rate_to",
        "company_fees",
        "member_fees",
        ["vendor_id", "customer_id"],
        ["id", "business_id"],
      ],
    });

    if (!business) {
      throw StatusError.badRequest(res.__("business id does not exist"));
    }

    return res.ok(business);
  } catch (error) {
    next(error);
  }
};
