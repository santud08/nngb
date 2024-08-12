import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * business restriction payment
 * @param req
 * @param res
 * @param next
 */

export const addRegistrationPayment = async (req, res, next) => {
  try {
    let reqBody = req.body;

    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const businessId = reqBody.business_id ? reqBody.business_id : "";

    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));
    const create_date = reqBody.registration_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.registration_date, "YYYY-MM-DD")
      : "";
    const businessPaymentData = {
      business_id: businessId,
      collateral_type: reqBody.collateral_type ? reqBody.collateral_type : "",
      transac_amount: reqBody.transac_amount ? reqBody.transac_amount : null,
      balance_amount: reqBody.balance_amount ? reqBody.balance_amount : 0,
      status: "active",
      created_at: create_date,
      created_by: userId,
    };
    const registrationPayment = await model.db.businessPayments.create(businessPaymentData);
    if (registrationPayment) {
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
