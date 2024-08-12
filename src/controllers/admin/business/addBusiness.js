import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper, generalHelper } from "../../../helpers/index.js";

/**
 * business Registration
 * @param req
 * @param res
 * @param next
 */

export const addBusiness = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const startDate = reqBody.start_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.start_date, "YYYY-MM-DD")
      : "";
    const endDate = reqBody.end_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.end_date, "YYYY-MM-DD")
      : "";
    const businessData = {
      uuid: await generalHelper.generateBusinessUuid(),
      vendor_id: reqBody.vendor_id ? reqBody.vendor_id : "",
      btype: reqBody.btype ? reqBody.btype : "",
      business_name: reqBody.business_title ? reqBody.business_title : null,
      status: reqBody.status ? reqBody.status : "active",
      service_start_date: startDate,
      service_end_date: endDate,
      earn_cash: reqBody.cache_fixed ? reqBody.cache_fixed : null,
      duplicate_check_method: reqBody.duplicate_check_method_id
        ? reqBody.duplicate_check_method_id
        : 0,
      gubun: reqBody.gubun_id ? reqBody.gubun_id : null,
      memo: reqBody.memo ? reqBody.memo : null,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    const registeredBusiness = await model.db.business.create(businessData);
    if (registeredBusiness) {
      if (reqBody.write_limit_business && reqBody.write_limit_business.length > 0) {
        let restrictedBusiness = [];
        for (const businessDetails of reqBody.write_limit_business) {
          const restrictbusinessRecord = {
            business_id: registeredBusiness.id,
            restric_business_id: businessDetails,
            created_at: await customDateTimeHelper.getCurrentDateTime(),
            created_by: userId,
          };
          restrictedBusiness.push(restrictbusinessRecord);
        }
        await model.db.businessRestrictionRegistration.bulkCreate(restrictedBusiness);
      }

      return res.ok({
        message: res.__("Registered successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
