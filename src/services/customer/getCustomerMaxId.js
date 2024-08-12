import * as model from "../../models/index.js";
import { Sequelize } from "sequelize";

export const getCustomerMaxId = async () => {
  const result = await model.db.customer.findOne({
    attributes: [[Sequelize.fn("MAX", Sequelize.col("id")), "maxId"]],
    raw: true,
  });
  return result;
};
