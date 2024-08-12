import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * Save Subpanel
 * @param req
 * @param res
 * @param next
 */
export const saveSubpanel = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const subpanel_title = reqBody.subpanel_title ? reqBody.subpanel_title : "";
    const status = reqBody.status ? reqBody.status : "active";
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;

    //Insert subpanel
    const insertedData = {
      subpanel_title: subpanel_title,
      status: status,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    const data = await model.db.subpanel.create(insertedData);

    if (data) {
      const subpanelId = data.id;
      const subpanelQuestionsInfo = reqBody.subpanel_questions;
      if (subpanelQuestionsInfo && subpanelQuestionsInfo.length > 0) {
        for (const singleQuestion of subpanelQuestionsInfo) {
          //Insert subpanel question
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

            if (subpanelQuestionOptionInfo && subpanelQuestionOptionInfo.length > 0) {
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

    return res.ok({
      message: res.__("Saved successfully"),
    });
  } catch (error) {
    next(error);
  }
};
