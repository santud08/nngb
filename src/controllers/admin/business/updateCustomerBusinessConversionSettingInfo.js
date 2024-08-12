import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * Add customer business
 * admin can add customer business information with details
 * @param req
 * @param res
 * @param next
 */
export const updateCustomerBusinessConversionSettingInfo = async (req, res, next) => {
  try {
    // Add necessary validations and checks here for the new values
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const businessId = reqBody.business_id ? reqBody.business_id : "";
    if (!businessId) {
      throw StatusError.badRequest(res.__("business id does not exists"));
    }
    // Your validation logic here
    const checkParentId = await model.db.business.findOne({
      where: { id: businessId, status: { [Op.ne]: "deleted" } },
    });
    if (!checkParentId) throw StatusError.badRequest(res.__("business id does not exists"));

    const reqFiles = req.files;
    const data = {
      module_format: reqBody.module_format ? reqBody.module_format : "",
      is_confirm: reqBody.is_confirm ? reqBody.is_confirm : "y",
      encryption_format: reqBody.encryption_format ? reqBody.encryption_format : "",
      encryption_key: reqBody.encryption_key ? reqBody.encryption_key : "",
      connection_url: reqBody.address_url ? reqBody.address_url : "",
      authentication_method: reqBody.authentication_method ? reqBody.authentication_method : "i,p",
      conversion_rate_from: reqBody.conversion_rate_from ? reqBody.conversion_rate_from : "",
      conversion_rate_to: reqBody.conversion_rate_to ? reqBody.conversion_rate_to : "",
      company_fees: reqBody.company_fees ? reqBody.company_fees : "",
      member_fees: reqBody.member_fees ? reqBody.member_fees : "",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    if (reqFiles.logo) {
      data.logo = reqFiles.logo.location;
    }
    await model.db.business.update(data, { where: { id: businessId } });
    res.ok({
      message: res.__("Saved successfully"),
    });
  } catch (error) {
    next(error);
  }
};
