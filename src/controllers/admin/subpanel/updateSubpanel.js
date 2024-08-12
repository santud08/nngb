import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update Subpanel
 * @param req
 * @param res
 * @param next
 */
export const updateSubpanel = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const subpanelId = reqBody.id ? reqBody.id : "";
    const subpanelTitle = reqBody.subpanel_title ? reqBody.subpanel_title : "";
    const status = reqBody.status ? reqBody.status : "active";
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;

    const getInfo = await model.db.subpanel.findOne({
      where: {
        id: subpanelId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getInfo) throw StatusError.badRequest(res.__("invalidId"));

    //Update subpanel
    const updatedData = {
      subpanel_title: subpanelTitle,
      status: status,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    const data = await model.db.subpanel.update(updatedData, {
      where: {
        id: subpanelId,
      },
    });

    if (data) {
      const subpanelQuestionsInfo = reqBody.subpanel_questions;
      if (subpanelQuestionsInfo && subpanelQuestionsInfo.length > 0) {
        for (const singleQuestion of subpanelQuestionsInfo) {
          if (singleQuestion && singleQuestion.id) {
            //########################
            //Update subpanel question
            //########################
            const questionId = singleQuestion.id;
            const updatedQuestionData = {
              subpanel_question: singleQuestion.subpanel_question
                ? singleQuestion.subpanel_question
                : "",
              updated_by: userId,
              updated_at: await customDateTimeHelper.getCurrentDateTime(),
            };
            if (
              await model.db.subpanelQuestion.count({
                where: { id: questionId, status: { [Op.ne]: "deleted" }, subpanel_id: subpanelId },
              })
            ) {
              await model.db.subpanelQuestion.update(updatedQuestionData, {
                where: {
                  id: singleQuestion.id,
                },
              });

              const subpanelQuestionOptionInfo =
                singleQuestion.subpanel_question_options &&
                singleQuestion.subpanel_question_options.length > 0
                  ? singleQuestion.subpanel_question_options
                  : [];
              if (subpanelQuestionOptionInfo) {
                for (const singleQuestionOption of subpanelQuestionOptionInfo) {
                  if (singleQuestionOption.id) {
                    //Update subpanel question option
                    const updatedQuestionOptionData = {
                      option_title: singleQuestionOption.option_title
                        ? singleQuestionOption.option_title
                        : "",
                      updated_by: userId,
                      updated_at: await customDateTimeHelper.getCurrentDateTime(),
                    };
                    if (
                      await model.db.subpanelQuestionOption.count({
                        where: {
                          id: singleQuestionOption.id,
                          question_id: questionId,
                          status: { [Op.ne]: "deleted" },
                        },
                      })
                    ) {
                      await model.db.subpanelQuestionOption.update(updatedQuestionOptionData, {
                        where: {
                          id: singleQuestionOption.id,
                        },
                      });
                    }
                  } else {
                    //Insert new subpanel question option
                    const insertedQuestionOptionData = {
                      question_id: questionId,
                      option_title: singleQuestionOption.option_title
                        ? singleQuestionOption.option_title
                        : "",
                      status: "active",
                      created_by: userId,
                      created_at: await customDateTimeHelper.getCurrentDateTime(),
                    };
                    await model.db.subpanelQuestionOption.create(insertedQuestionOptionData);
                  }
                }
              }
            }
          } else {
            //########################
            //Insert subpanel question
            //########################
            const insertedQuestionData = {
              subpanel_id: subpanelId,
              subpanel_question: singleQuestion.subpanel_question
                ? singleQuestion.subpanel_question
                : "",
              question_type: singleQuestion.question_type ? singleQuestion.question_type : null,
              status: "active",
              created_by: userId,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
            };
            const dataQuestion = await model.db.subpanelQuestion.create(insertedQuestionData);

            if (dataQuestion) {
              const questionId = dataQuestion.id;
              const subpanelQuestionOptionInfo = singleQuestion.subpanel_question_options;

              if (subpanelQuestionOptionInfo) {
                for (const singleQuestionOption of subpanelQuestionOptionInfo) {
                  //Insert subpanel question option
                  const insertedQuestionOptionData = {
                    question_id: questionId,
                    option_title: singleQuestionOption.option_title
                      ? singleQuestionOption.option_title
                      : "",
                    status: "active",
                    created_by: userId,
                    created_at: await customDateTimeHelper.getCurrentDateTime(),
                  };
                  await model.db.subpanelQuestionOption.create(insertedQuestionOptionData);
                }
              }
            }
          }
        }
      }
    }

    return res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
