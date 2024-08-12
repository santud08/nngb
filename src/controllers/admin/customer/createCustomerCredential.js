import { StatusError } from "../../../config/index.js";
import bcrypt from "bcrypt";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { envs } from "../../../config/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * savePersonInCharge
 * save person-in-charge
 * @param req
 * @param res
 * @param next
 */
export const createCustomerCredential = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const customerId = reqBody.customer_id ? reqBody.customer_id : null;
    const userName = reqBody.user_name ? reqBody.user_name : null;
    const password = reqBody.password ? reqBody.password : null;

    let conditions = {
      status: { [Op.ne]: "deleted" },
      id: customerId,
      vendor_type: "affiliate",
    };
    // Check if Customer Exists
    const isCustomerExist = await model.db.customer.findOne({
      where: conditions,
    });

    if (!isCustomerExist) {
      throw StatusError.badRequest(res.__("Invalid Customer Id"));
    }

    let userNameConditions = {
      status: { [Op.ne]: "deleted" },
      user_name: userName,
    };
    // Check if user_name is already registered or not
    const isUserNameExist = await model.db.adminUsers.findOne({
      where: userNameConditions,
    });

    if (isUserNameExist) {
      throw StatusError.badRequest(res.__("This username is already registered"));
    }

    let customerCredentialConditions = {
      status: { [Op.ne]: "deleted" },
      vendor_id: customerId,
    };
    // Check if this vendor has existing credential or not
    const isCredentialExist = await model.db.adminUsers.findOne({
      where: customerCredentialConditions,
    });

    if (isCredentialExist) {
      throw StatusError.badRequest(res.__("Credential for this vendor is already registered"));
    }

    const encpassword = await bcrypt.hash(password, envs.passwordSalt);

    const dataCustomerCredential = {
      passwd: encpassword,
      user_name: userName,
      name: isCustomerExist.customer_name,
      phone: isCustomerExist.phone_no,
      mobile: isCustomerExist.contact_phone_no,
      vendor_id: customerId,
      company: isCustomerExist.company_customer_name,
      user_type: "vendor",
      reg_day: await customDateTimeHelper.getCurrentDateTime(),
      status: "active",
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    await model.db.adminUsers.create(dataCustomerCredential);

    res.ok({
      message: res.__("Saved successfully"),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
