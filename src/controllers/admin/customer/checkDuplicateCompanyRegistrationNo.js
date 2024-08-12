import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * checkDuplicateCompanyRegistrationNo
 * @param req
 * @param res
 * @param next
 */
export const checkDuplicateCompanyRegistrationNo = async (req, res, next) => {
  try {
    const companyRegistrationNo = req.query.company_registration_no
      ? req.query.company_registration_no
      : null;
    if (!companyRegistrationNo)
      throw StatusError.badRequest(res.__("Invalid Company Registration No."));

    const customerId = req.query.customer_id ? req.query.customer_id : null;

    let conditions = {
      status: { [Op.ne]: "deleted" },
      company_registration_no: companyRegistrationNo,
      type: "corporation",
    };
    if (customerId) {
      conditions.id = { [Op.ne]: customerId };
    }
    // Check if the registration no already exists in the database
    const isCompanyExist = await model.db.customer.findOne({
      where: conditions,
    });

    if (isCompanyExist) {
      throw StatusError.badRequest(
        res.__("The company with same registration number already exist"),
      );
    }
    return res.ok({ message: res.__("success") });
  } catch (error) {
    next(error);
  }
};
