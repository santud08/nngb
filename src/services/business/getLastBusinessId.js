import * as model from "../../models/index.js";

export const getLastBusinessId = async (conditions = null) => {
  const result = await model.db.business.findOne({
    where: conditions,
    order: [["id", "DESC"]],
  });
  return result && result.id ? result.id : 0;
};
