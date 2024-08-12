import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Get survey information details by business_id
 * @param req
 * @param res
 */
export const surveyInformationDetails = async (req, res, next) => {
  try {
    const businessId = req.query.business_id ? req.query.business_id : null;
    if (!businessId) throw new StatusError("business Id is required");
    const business = await models.db.business.findOne({
      where: {
        id: businessId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!business) throw StatusError.badRequest(res.__("invalidId"));

    // dummy survey data
    const surveyData = {
      id: 1,
      project_name: "dummy",
      title: "test",
      apply_point: "y",
      earned_cash: [
        {
          label_name: "C", // complete
          status: "active",
          min_range: "",
          max_range: "",
        },
        {
          label_name: "SO", // screen out
          status: "active",
          min_range: "",
          max_range: "",
        },
        {
          label_name: "QO", // quater out
          status: "active",
          min_range: "",
          max_range: "",
        },
      ],
    };

    return res.ok(surveyData);
  } catch (error) {
    next(error);
  }
};
