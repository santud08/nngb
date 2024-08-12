import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Sequelize } from "sequelize";

/**
 * viewInquiry
 * @param req
 * @param res
 */
export const viewInquiry = async (req, res, next) => {
  try {
    const inquiryId = req.params.id ? req.params.id : null;
    if (!inquiryId) throw StatusError.badRequest(res.__("idIsRequired"));

    const inquiry = await models.db.inquiry.findOne({
      where: {
        id: inquiryId,
        status: "active",
      },
      attributes: [
        "id",
        "inquiry_title",
        "inquiry_description",
        "inquiry_answer",
        "replied_at",
        "inquiry_status",
        "user_email",
        "panel",
        [Sequelize.literal("DATE_FORMAT(inquiry.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
      ],
      include: [
        {
          model: models.db.inquiryCategory,
          as: "inquiryCategory",
          attributes: ["id", "category_name"],
        },
      ],
    });
    if (!inquiry) throw StatusError.badRequest(res.__("inquiry on this id is not found"));
    if (inquiry && inquiry.dataValues.inquiryCategory) {
      inquiry.dataValues.inquiry_category = inquiry.dataValues.inquiryCategory;
      delete inquiry.dataValues.inquiryCategory;
    }
    return res.ok(inquiry);
  } catch (error) {
    next(error);
  }
};
