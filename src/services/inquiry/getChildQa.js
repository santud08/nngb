import * as model from "../../models/index.js";
import { Sequelize } from "sequelize";

export const getChildQa = async (inquiry_id) => {
  const result = await model.db.inquiry.findAll({
    where: { parent_id: inquiry_id },
    order: [["id", "DESC"]],
    attributes: [
      "id",
      "inquiry_description",
      [Sequelize.literal("CONCAT('', inquiry.inquiry_answer)"), "inquiry_answer"],
    ],
    raw: true,
  });

  const enquiries = result.map((inquiry) => {
    return inquiry;
  });

  return enquiries;
};
