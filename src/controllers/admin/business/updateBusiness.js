import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update Business
 * @param req
 * @param res
 * @param next
 */
export const updateBusiness = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const businessId = reqBody.id ? reqBody.id : "";
    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));

    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    const startDate = reqBody.start_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.start_date, "YYYY-MM-DD")
      : "";
    const endDate = reqBody.end_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.end_date, "YYYY-MM-DD")
      : "";
    const business = await models.db.business.findOne({
      where: {
        id: businessId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!business) throw StatusError.badRequest(res.__("invalidId"));

    const updatedData = {
      vendor_id: reqBody.vendor_id ? reqBody.vendor_id : "",
      btype: reqBody.btype ? reqBody.btype : "",
      business_name: reqBody.business_title ? reqBody.business_title : null,
      status: reqBody.status ? reqBody.status : "active",
      service_start_date: startDate,
      service_end_date: endDate,
      earn_cash: reqBody.cache_fixed ? reqBody.cache_fixed : null,
      duplicate_check_method: reqBody.duplicate_checke_method_id
        ? reqBody.duplicate_checke_method_id
        : 0,
      gubun: reqBody.gubun_id ? reqBody.gubun_id : null,
      memo: reqBody.memo ? reqBody.memo : null,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };

    const updateBusiness = await models.db.business.update(updatedData, {
      where: {
        id: businessId,
      },
    });
    if (updateBusiness) {
      if (reqBody.write_limit_business && reqBody.write_limit_business.length > 0) {
        await models.db.businessRestrictionRegistration.update(
          {
            status: "deleted",
            updated_at: await customDateTimeHelper.getCurrentDateTime(),
            updated_by: userId,
          },
          {
            where: { business_id: businessId },
          },
        );
        let restrictedBusiness = [];
        for (const businessDetails of reqBody.write_limit_business) {
          const extData = await models.db.businessRestrictionRegistration.findOne({
            where: { business_id: businessId, restric_business_id: businessDetails },
          });
          if (extData) {
            await models.db.businessRestrictionRegistration.update(
              {
                status: "active",
                updated_at: await customDateTimeHelper.getCurrentDateTime(),
                updated_by: userId,
              },
              {
                where: { business_id: businessId, id: extData.id },
              },
            );
          } else {
            const restrictbusinessRecord = {
              business_id: businessId,
              restric_business_id: businessDetails,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
              created_by: userId,
            };
            restrictedBusiness.push(restrictbusinessRecord);
          }
        }
        if (restrictedBusiness.length > 0)
          await models.db.businessRestrictionRegistration.bulkCreate(restrictedBusiness);
      }

      return res.ok({
        message: res.__("Updated successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
