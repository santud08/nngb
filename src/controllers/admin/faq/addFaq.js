import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * addFaq
 * Create a new FAQ with the provided details.
 * @param req
 * @param res
 * @param next
 */

export const addFaq = async (req, res, next) => {
  try {
    const reqData = req.body; // The data you provided as the request body

    const userId = req.userDetails.userId;

    // Create a new FAQ object using the provided data
    const faq = {
      faq_category_id: reqData.faq_category_id,
      faq_title: reqData.faq_title,
      faq_description: reqData.faq_description,
      panel: reqData.panel,
      status: reqData.status || "active", // You can set a default status if not provided
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    // Create the FAQ in the database
    const createdFaq = await model.db.faq.create(faq);

    if (createdFaq) {
      return res.ok({ message: res.__("success") });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
