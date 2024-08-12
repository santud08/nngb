import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";

/**
 * Get business payment by ID
 * @param req
 * @param res
 */
export const businessPaymentDetails = async (req, res, next) => {
  try {
    const businessId = req.params.businessId ? req.params.businessId : null;
    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));

    const businessPayments = await models.db.businessPayments.findOne({
      attributes: [
        "id",
        "business_id",
        "collateral_type",
        ["transac_amount", "registration_ammount"],
        "balance_amount",
        ["created_at", "registration_date"],
        "status",
      ],
      where: {
        business_id: businessId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!businessPayments) throw StatusError.badRequest(res.__("invalid user id"));

    return res.ok(businessPayments);
  } catch (error) {
    next(error);
  }
};
