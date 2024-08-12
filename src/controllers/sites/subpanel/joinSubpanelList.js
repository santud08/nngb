import * as model from "../../../models/index.js";

/**
 * joinSubpanelList
 * @param req
 * @param res
 * @param next
 */
export const joinSubpanelList = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId ? req.userDetails.userId : null;
    //Retrieve joined panel list
    const resultData = await model.db.subpanel.findAll({
      attributes: ["id", "subpanel_title"],
      include: [
        {
          model: model.db.subpanelUserJoined,
          required: false,
          where: { user_id: userId, status: "active" },
          attributes: [],
        },
      ],
      where: { status: "active", "$subpanelUserJoined.id$": null },
      order: [["id", "DESC"]],
    });

    return res.ok({
      results: resultData,
    });
  } catch (error) {
    next(error);
  }
};
