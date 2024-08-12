import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";
import { ACCUMULATION_TYPE } from "../../../utils/constants.js";

/**
 * cash conversion details by product by IDs
 * @param req
 * @param res
 */
export const cashConversionDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id ? req.params.id : null;
    if (!orderId) throw StatusError.badRequest(res.__("Order Id is required"));
    const getOrder = await models.db.eTicketOrder.findOne({
      where: {
        id: orderId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getOrder) {
      throw StatusError.badRequest("invalidId");
    } else {
      const result = [];
      if (getOrder.webhard_used !== null && getOrder.webhard_used !== undefined) {
        result.push({
          accumulation_type: ACCUMULATION_TYPE.WEBHARD_NCASH,
          charge: getOrder.webhard_charge,
          ncash: getOrder.webhard_used,
        });
      }

      if (getOrder.ncash_used !== null && getOrder.ncash_used !== undefined) {
        result.push({
          accumulation_type: ACCUMULATION_TYPE.OTHER_NCASH,
          charge: getOrder.other_charge,
          ncash: getOrder.ncash_used,
        });
      }
      return res.ok(result);
    }
  } catch (error) {
    next(error);
  }
};
