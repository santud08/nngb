import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getOpinionAnswer = async (searchParams) => {
  const conditions = {};
  if (searchParams.status) {
    conditions.status = searchParams.status;
  } else {
    conditions.status = { [Op.eq]: "active" };
  }

  if (searchParams.opinion_id) {
    conditions.opinion_id = { [Op.eq]: searchParams.opinion_id };
  }

  const result = await model.db.opinionAnswer.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
