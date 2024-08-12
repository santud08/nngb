import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getOpinion = async (searchParams) => {
  const conditions = {};
  if (searchParams.status) {
    conditions.status = searchParams.status;
  } else {
    conditions.status = { [Op.eq]: "active" };
  }

  if (searchParams.opinion_id) {
    conditions.id = { [Op.eq]: searchParams.opinion_id };
  }

  const result = await model.db.opinion.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
