import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * updateFaq
 * Update an existing FAQ with the provided details.
 * @param req
 * @param res
 * @param next
 */

export const updateFaq = async (req, res, next) => {
  try {
    const reqData = req.body; // The data you provided as the request body
    const userId = req.userDetails.userId;
    const faqId = req.body.faq_id; // Assuming you have a parameter for FAQ ID in the URL

    // Check if the FAQ exists in the database
    const existingFaq = await model.db.faq.findByPk(faqId);

    if (!existingFaq) {
      throw StatusError.notFound(res.__("FAQ not found"));
    }

    // Define the fields to update
    const updateFields = {
      faq_category_id: reqData.faq_category_id,
      faq_title: reqData.faq_title,
      faq_description: reqData.faq_description,
      panel: reqData.panel,
      status: reqData.status || existingFaq.status, // Use the existing status if not provided in the request
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    // Update the FAQ in the database using the update method
    await model.db.faq.update(updateFields, { where: { id: faqId } });

    return res.ok({ message: res.__("success") });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
