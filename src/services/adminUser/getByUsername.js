import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getByUsername = async (userName, status = null) => {
  const conditions = { user_name: userName };
  if (status) {
    conditions.status = status;
  } else {
    conditions.status = { [Op.ne]: "deleted" };
  }
  const result = await model.db.user.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
