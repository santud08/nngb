import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * subpanelWithdrawal
 * @param req
 * @param res
 * @param next
 */
export const subpanelWithdrawal = async (req, res, next) => {
  try {
    const subpanelId = req.body.subpanel_id ? req.body.subpanel_id : null;
    const userId = req.userDetails.userId ? req.userDetails.userId : null;

    const getInfo = await model.db.subpanel.findOne({
      where: {
        id: subpanelId,
        status: "active",
      },
    });
    if (!getInfo) throw StatusError.badRequest(res.__("invalidId"));

    //Check subpanel already joined
    const dataSubpanelUserJoined = await model.db.subpanelUserJoined.findOne({
      where: {
        user_id: userId,
        subpanel_id: subpanelId,
        status: "active",
        is_joined: "y",
      },
    });

    if (!dataSubpanelUserJoined) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    //Update
    const updatedData = {
      is_joined: "n",
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    await model.db.subpanelUserJoined.update(updatedData, {
      where: {
        subpanel_id: subpanelId,
        user_id: userId,
      },
    });

    return res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
