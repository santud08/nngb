import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";

/**
 * Get a customer by ID
 * @param req
 * @param res
 */
export const viewCompany = async (req, res, next) => {
  try {
    //const { company } = req.params;
    //const userId = req.userDetails.userId;
    if (!req.body.panel) throw StatusError.badRequest(res.__("Panel is required"));
    const company = await models.db.companySettings.findOne({
      where: {
        panel: req.body.panel,
        // created_by:userId,
        status: "active",
      },
      attributes: [
        "created_at",
        "id",
        "panel",
        "company_name",
        "company_email",
        "support_email",
        "facebook_link",
        "naver_link",
        "twitter_link",
        "company_start_year",
      ],
    });
    if (!company) throw StatusError.badRequest(res.__("company on this id is not found"));

    return res.ok({
      results: company,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
