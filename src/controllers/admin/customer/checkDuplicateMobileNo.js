import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * checkDuplicateMobileNo
 * @param req
 * @param res
 * @param next
 */
export const checkDuplicateMobileNo = async (req, res, next) => {
  try {
    const mobileNo = req.query.mobile_no ? req.query.mobile_no : null;
    if (!mobileNo) throw StatusError.badRequest(res.__("Invalid mobile no."));

    const customerId = req.query.customer_id ? req.query.customer_id : null;

    let conditions = {
      status: { [Op.ne]: "deleted" },
      mobile_no: mobileNo,
      type: "individual",
    };
    if (customerId) {
      conditions.id = { [Op.ne]: customerId };
    }
    // Check if the registration no already exists in the database
    const isMobileExist = await model.db.customer.findOne({
      where: conditions,
    });

    if (isMobileExist) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }
    return res.ok({ message: res.__("success") });
  } catch (error) {
    next(error);
  }
};
