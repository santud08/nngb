import { Sequelize, Op } from "sequelize";
import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * view Subpanel
 * @param req
 * @param res
 * @param next
 */
export const viewSubpanel = async (req, res, next) => {
  try {
    const subpanelId = req.params.id;
    if (!subpanelId) throw StatusError.badRequest("invalidId");

    const getInfo = await model.db.subpanel.findOne({
      where: {
        id: subpanelId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getInfo) throw StatusError.badRequest("invalidId");

    const conditions = { id: subpanelId, status: { [Op.ne]: "deleted" } };

    const includeQuery = [
      {
        model: model.db.subpanelQuestion,
        attributes: [["id", "question_id"], "subpanel_question", "question_type"],
        where: { status: "active" },
        include: [
          {
            model: model.db.subpanelQuestionOption,
            attributes: [["id", "option_id"], "option_title"],
            where: { status: "active" },
            required: false,
            order: [[Sequelize.literal("subpanelQuestion.subpanelQuestionOption.id"), "ASC"]],
          },
        ],
        order: [["subpanelQuestion.id", "ASC"]],
        required: false,
      },
      // {
      //   model: model.db.subpanelUserJoined,
      //   include: [
      //     {
      //       model: model.db.subpanelUserJoinedAnswer,
      //       attributes: ["id", "subpanel_questions_id", "subpanel_questions_options_id", "comment"],
      //       where: { status: "active" },
      //       required: false,
      //     },
      //   ],
      //   attributes: ["id"],
      //   where: { status: "active" },
      //   required: false,
      // },
    ];

    const selectAttributes = [
      "id",
      "subpanel_title",
      [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("subpanel.created_at"), "%Y-%m-%d %H:%i:%s"),
        "created_at",
      ],
      [Sequelize.literal(`CASE WHEN subpanel.status = 'active' THEN 'Y' ELSE 'N' END`), "status"],
    ];

    const sortOrder = [
      ["id", "DESC"],
      [model.db.subpanelQuestion, "id", "ASC"],
      [model.db.subpanelQuestion, model.db.subpanelQuestionOption, "id", "ASC"],
    ];

    let resultData = await model.db.subpanel.findOne({
      where: conditions,
      include: includeQuery,
      attributes: selectAttributes,
      order: sortOrder,
    });

    if (resultData) {
      if (
        resultData.dataValues.subpanelQuestions &&
        resultData.dataValues.subpanelQuestions.length > 0
      ) {
        resultData.dataValues.subpanel_questions = resultData.dataValues.subpanel_questions || [];
        resultData.dataValues.subpanel_questions = resultData.dataValues.subpanelQuestions;
        delete resultData.dataValues.subpanelQuestions;

        for (const i in resultData.dataValues.subpanel_questions) {
          if (
            resultData.dataValues.subpanel_questions[i].dataValues &&
            resultData.dataValues.subpanel_questions[i].dataValues.subpanelQuestionOptions &&
            resultData.dataValues.subpanel_questions[i].dataValues.subpanelQuestionOptions.length >
              0
          ) {
            resultData.dataValues.subpanel_questions[i].dataValues.subpanel_question_options =
              resultData.dataValues.subpanel_questions[i].dataValues.subpanel_question_options ||
              [];
            resultData.dataValues.subpanel_questions[i].dataValues.subpanel_question_options =
              resultData.dataValues.subpanel_questions[i].dataValues.subpanelQuestionOptions;
            delete resultData.dataValues.subpanel_questions[i].dataValues.subpanelQuestionOptions;
          } else {
            resultData.dataValues.subpanel_questions[i].dataValues.subpanel_question_options = [];
            delete resultData.dataValues.subpanel_questions[i].dataValues.subpanelQuestionOptions;
          }
        }
      } else {
        resultData.dataValues.subpanel_questions = [];
        delete resultData.dataValues.subpanelQuestions;
      }
      delete resultData.dataValues.subpanelUserJoined;
    }
    return res.ok(resultData);
  } catch (error) {
    next(error);
  }
};
