import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * joinToSubpanel
 * @param req
 * @param res
 * @param next
 */
export const joinToSubpanel = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const subpanelId = reqBody.subpanel_id ? reqBody.subpanel_id : null;
    const userId = req.userDetails.userId ? req.userDetails.userId : null;

    const getInfo = await model.db.subpanel.findOne({
      where: {
        id: subpanelId,
        status: "active",
      },
    });
    if (!getInfo) throw StatusError.badRequest("invalidId");

    //Check subpanel already joined
    const dataSubpanelUserJoined = await model.db.subpanelUserJoined.findOne({
      where: {
        user_id: userId,
        subpanel_id: subpanelId,
        status: "active",
      },
    });

    if (dataSubpanelUserJoined) {
      throw StatusError.badRequest(res.__("Already joined for this subpanel"));
    }

    //Insert
    const insertedData = {
      user_id: userId,
      subpanel_id: subpanelId,
      status: "active",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    const data = await model.db.subpanelUserJoined.create(insertedData);
    if (data) {
      const answersInfo = reqBody.answers;
      if (answersInfo && answersInfo.length > 0) {
        for (const singleAnswer of answersInfo) {
          const insertedAnswerData = {
            subpanel_user_joined_id: data.id,
            subpanel_questions_id: singleAnswer.question_id ? singleAnswer.question_id : "",
            subpanel_questions_options_id: singleAnswer.option_id ? singleAnswer.option_id : null,
            comment: singleAnswer.comment ? singleAnswer.comment : null,
            status: "active",
            created_by: userId,
            created_at: await customDateTimeHelper.getCurrentDateTime(),
          };
          await model.db.subpanelUserJoinedAnswer.create(insertedAnswerData);
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
