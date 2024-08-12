import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getByEmail = async (email, status = null) => {
  let conditions = { email: email };
  if (status) {
    conditions.status = status;
  } else {
    conditions.status = { [Op.ne]: "deleted" };
  }
  const result = await model.db.adminUsers.findOne({
    where: conditions,
    raw: true,
  });

  return result;
};
