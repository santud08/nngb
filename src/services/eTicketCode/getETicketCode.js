import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getETicketCode = async (searchParams) => {
  const conditions = {};
  if (searchParams.status) {
    conditions.status = searchParams.status;
  } else {
    conditions.status = { [Op.eq]: "active" };
  }

  if (searchParams.user_id) {
    conditions.created_by = { [Op.eq]: searchParams.user_id };
  }

  if (searchParams.e_ticket_code_id) {
    conditions.id = { [Op.eq]: searchParams.e_ticket_code_id };
  }

  const result = await model.db.eTicketCode.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
