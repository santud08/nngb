import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * deleteFaq
 * Delete an FAQ by updating its status to "deleted."
 * @param req
 * @param res
 * @param next
 */
export const deleteFaq = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;
    const faqIdToDelete = req.body.id; // Specify the FAQ ID to delete

    // Find the FAQ to delete based on its ID
    let faqToDelete = await model.db.faq.findOne({
      where: {
        id: faqIdToDelete,
        status: "active",
      },
    });

    if (!faqToDelete) {
      throw StatusError.badRequest(res.__("FAQ does not exist"));
    }

    // Update the FAQ's status to "deleted" using faqToDelete.update
    const updatedFaq = await faqToDelete.update({
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    });

    if (updatedFaq) {
      return res.ok({ message: res.__("FAQ has been deleted") });
    } else {
      throw StatusError.serverError(res.__("Server error while deleting the FAQ"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
