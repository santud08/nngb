import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Get business by ID
 * @param req
 * @param res
 */
export const businessDetails = async (req, res, next) => {
  try {
    const businessId = req.params.id ? req.params.id : null;
    if (!businessId) throw StatusError.badRequest(res.__("business Id is required"));

    const getBusiness = await models.db.business.findOne({
      where: {
        id: businessId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getBusiness) throw StatusError.badRequest("invalidId");

    const conditions = { id: businessId, status: { [Op.ne]: "deleted" } };

    const includeQuery = [
      {
        model: models.db.businessTypes,
        attributes: ["id", "title"],
        where: { status: { [Op.ne]: "deleted" } },
        required: false,
      },
      {
        model: models.db.duplicateCheckMethod,
        attributes: ["id", "method_name"],
        required: false,
        where: {
          status: { [Op.ne]: "deleted" },
        },
      },
      {
        model: models.db.businessRestrictionRegistration,
        attributes: ["id", "restric_business_id"],
        required: false,
        where: {
          status: { [Op.ne]: "deleted" },
          business_id: businessId,
        },
      },
      {
        model: models.db.customer,
        attributes: ["id", "customer_name"],
        where: { status: { [Op.ne]: "deleted" } },
        required: false,
      },
    ];

    const selectAttributes = [
      "id",
      "uuid",
      "vendor_id",
      "btype",
      "business_name",
      "service_start_date",
      "service_end_date",
      "status",
      "earn_cash",
      "duplicate_check_method",
      "memo",
    ];

    const business = await models.db.business.findOne({
      where: conditions,
      include: includeQuery,
      attributes: selectAttributes,
    });

    if (!business) throw StatusError.badRequest(res.__("invalidId"));
    const businessDetails = {
      id: business.id,
      vendor_id: business.vendor_id,
      vendor_name:
        business.customer && business.customer.customer_name
          ? business.customer.customer_name
          : null,
      btype:
        business.businessType && business.businessType.title ? business.businessType.title : null,
      btype_id: business.btype ? business.btype : null,
      business_title: business.business_name ? business.business_name : null,
      business_id: business.uuid ? business.uuid : null,
      start_date: business.service_start_date ? business.service_start_date : null,
      end_date: business.service_end_date ? business.service_end_date : null,
      status: business.status ? business.status : null,
      freez_the_cache: business.earn_cash ? business.earn_cash : null,
      duplicate_checke_method:
        business.duplicateCheckMethod && business.duplicateCheckMethod.method_name
          ? business.duplicateCheckMethod.method_name
          : null,
      duplicate_checke_method_id: business.duplicate_check_method
        ? business.duplicate_check_method
        : null,
      memo: business.memo ? business.memo : null,
      write_limit_business:
        business.businessRestrictionRegistrations &&
        business.businessRestrictionRegistrations.length
          ? business.businessRestrictionRegistrations.map((biz) => biz.restric_business_id)
          : [],
    };

    return res.ok(businessDetails);
  } catch (error) {
    next(error);
  }
};
