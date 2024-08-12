import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";

/**
 * viewInquiry
 * @param req
 * @param res
 */
export const viewInquiry = async (req, res, next) => {
  try {
    const inquiryId = req.params.id ? req.params.id : null;
    if (!inquiryId) throw StatusError.badRequest(res.__("invalidId"));

    let inquiry = await models.db.inquiry.findOne({
      where: {
        id: inquiryId,
        parent_id: 0, // Fetch the parent inquiry where parent_id is 0
        status: { [Op.ne]: "deleted" },
      },
      attributes: [
        "id",
        [col("inquirer.user_name"), "user_name"],
        "user_email",
        ["inquiry_category_id", "category_id"],
        [col("inquiryCategory.category_name"), "category_name"],
        "inquiry_title",
        "inquiry_description",
        "inquiry_answer",
        [
          Sequelize.fn(
            "IFNULL",
            Sequelize.literal("DATE_FORMAT(inquiry.created_at, '%Y-%m-%d %H:%i:%s')"),
            "",
          ),
          "created_at",
        ],
        "inquiry_status",
      ],
      include: [
        {
          model: models.db.user,
          as: "inquirer",
          attributes: [],
          required: true,
          where: { status: { [Op.ne]: "deleted" } },
        },
        {
          model: models.db.inquiryCategory,
          attributes: [],
          where: { status: { [Op.ne]: "deleted" } },
          required: true,
        },
        {
          model: models.db.inquiry,
          as: "replyQuestion",
          attributes: [
            "id",
            "parent_id",
            "inquiry_description",
            "user_email",
            [
              Sequelize.fn(
                "IFNULL",
                Sequelize.literal("DATE_FORMAT(replyQuestion.created_at, '%Y-%m-%d %H:%i:%s')"),
                "",
              ),
              "created_at",
            ],
            "inquiry_answer",
            [
              Sequelize.literal("DATE_FORMAT(replyQuestion.replied_at, '%Y-%m-%d %H:%i:%s')"),
              "replied_at",
            ],
          ],
          required: false,
          left: true,
          where: { status: { [Op.ne]: "deleted" } },
        },
      ],
    });
    if (!inquiry) {
      throw StatusError.badRequest(res.__("inquiry id does not exist"));
    }

    if (inquiry) {
      if (inquiry.dataValues && inquiry.dataValues.replyQuestion) {
        inquiry.dataValues.reply_questions = inquiry.dataValues.replyQuestion;
        delete inquiry.dataValues.replyQuestion;
      } else {
        inquiry.reply_questions = [];
      }
    }

    return res.ok({
      results: inquiry,
    });
  } catch (error) {
    next(error);
  }
};
