import * as model from "../../models/index.js";
import { Sequelize } from "sequelize";

export const getContactPersonMaxId = async () => {
  const result = await model.db.contactPersons.findOne({
    attributes: [[Sequelize.fn("MAX", Sequelize.col("id")), "maxId"]],
    raw: true,
  });
  return result;
};
