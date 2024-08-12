import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Delete subpanel by ID
 * @param req
 * @param res
 */
export const deleteSubpanel = async (req, res, next) => {
  try {
    const subpanelId = req.body.id ? req.body.id : null;
    if (!subpanelId) throw StatusError.badRequest("invalidId");

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const getInfo = await models.db.subpanel.findOne({
      where: {
        id: subpanelId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getInfo) throw StatusError.badRequest("invalidId");

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    const upRes = await models.db.subpanel.update(data, { where: { id: subpanelId } });
    const getQues = await models.db.subpanelQuestion.findAll({
      attributes: ["id"],
      where: {
        subpanel_id: subpanelId,
        status: { [Op.ne]: "deleted" },
      },
    });
    const quesIdArray = getQues && getQues.length > 0 ? getQues.map((ques) => ques.id) : [];
    if (upRes) {
      await Promise.all([
        quesIdArray.length > 0
          ? models.db.subpanelQuestionOption.update(data, {
              where: { question_id: { [Op.in]: quesIdArray } },
            })
          : "",
        models.db.subpanelQuestion.update(data, { where: { subpanel_id: subpanelId } }),
      ]);
      return res.ok({
        message: res.__("Deleted successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("SomeThingWentWrong"));
    }
  } catch (error) {
    next(error);
  }
};
