import { opinionService, opinionAnswerService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * Save opinion answer
 * @param req
 * @param res
 * @param next
 */
export const saveOpinion = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userDetails = req.userDetails;
    const userId = userDetails.userId ? userDetails.userId : 0;

    //Check option existence
    const searchParams = {
      opinion_id: reqBody.opinion_id,
      status: reqBody.status ? reqBody.status : "active",
    };
    const resultOpinion = await opinionService.getOpinion(searchParams);
    if (!resultOpinion) {
      throw StatusError.badRequest(res.__("Opinion do not exist"));
    }

    //Check option answer and comment both cannot be blank
    if (
      (reqBody.opinion_item_id <= 0 || !reqBody.opinion_item_id || reqBody.opinion_item_id == "") &&
      (!reqBody.comment || reqBody.opinion_id == "")
    ) {
      throw StatusError.badRequest(res.__("Both option and comment cannot be blank"));
    }

    //Check option answer existence
    const searchParamsAnswer = {
      opinion_id: reqBody.opinion_id,
      status: reqBody.status ? reqBody.status : "active",
    };
    const resultOpinionAnswer = await opinionAnswerService.getOpinionAnswer(searchParamsAnswer);
    if (resultOpinionAnswer) {
      throw StatusError.badRequest(res.__("Already answered for this opinion"));
    }

    //process.exit();

    //Insert option answer
    const insertedData = {
      status: "active",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
      updated_by: userId,
    };

    if (reqBody.opinion_id) {
      insertedData.opinion_id = reqBody.opinion_id;
    }

    if (reqBody.opinion_item_id) {
      insertedData.opinion_item_id = reqBody.opinion_item_id;
    }

    if (reqBody.comment) {
      insertedData.comment = reqBody.comment;
    }

    await opinionAnswerService.saveOpinionAnswer(insertedData);

    return res.ok({
      results: {
        message: res.__("Saved successfully"),
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
