import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getSubpanelUserJoinedList = async (searchParams) => {
  let conditions = { status: "active" };
  if (searchParams.status_in) {
    conditions.status = { [Op.in]: searchParams.status_in };
  } else {
    if (searchParams.status) {
      conditions.status = searchParams.status;
    }
  }

  if (searchParams.user_id) {
    conditions.user_id = searchParams.user_id;
  }

  if (searchParams.subpanel_id) {
    conditions.subpanel_id = searchParams.subpanel_id;
  }

  const result = await model.db.subpanelUserJoined.findAll({
    where: conditions,
  });
  return result;
};
