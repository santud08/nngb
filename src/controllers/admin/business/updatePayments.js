import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * update regsitration amount
 * @param req
 * @param res
 * @param next
 */
export const updateBusinessPayments = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const paymentId = req.body.payment_id;
    const isExists = await model.db.businessPayments.findOne({
      where: { id: paymentId, status: { [Op.ne]: "deleted" } },
    });
    if (!isExists) {
      throw StatusError.badRequest(res.__("Not Exists"));
    }
    // prepare data for insertion
    const data = {
      transac_amount: reqBody.transac_amount,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    await model.db.businessPayments.update(data, {
      where: {
        id: paymentId,
      },
    });

    res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
