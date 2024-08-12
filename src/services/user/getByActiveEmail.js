import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getByActiveEmail = async (email, status = null) => {
  const conditions = { email: email };
  if (status) {
    conditions.status = status;
  } else {
    conditions.status = "active";
  }
  const result = await model.db.user.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
