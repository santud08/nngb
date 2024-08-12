import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";

/**
 * viewFaq
 * Retrieve details of a specific faq by its ID.
 * Users can view information about a faq, including its name, exposure dates, image paths, links, acquisition channel, priority, and status.
 * @param req
 * @param res
 * @param next
 */
export const viewFaq = async (req, res, next) => {
  try {
    const faqId = req.params.id ? req.params.id : null;
    if (!faqId) throw StatusError.badRequest(res.__("invalidId"));

    let faq = await models.db.faq.findOne({
      where: {
        id: faqId,
        status: {
          [Op.ne]: "deleted", // Exclude records with status 'deleted'
        },
      },
      attributes: ["id", "faq_title", "faq_description", "faq_category_id", "status", "created_at"],
    });

    if (!faq) {
      throw StatusError.badRequest(res.__("faq id does not exist"));
    }

    return res.ok({
      results: faq,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
