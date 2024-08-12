import * as model from "../../models/index.js";
import { Op } from "sequelize";

export const getByUserNameAndUserType = async (userName, userType, status = null) => {
  let conditions = { user_name: userName };
  if (userType) {
    conditions.user_type = userType;
  } else {
    conditions.user_type = { [Op.in]: ["super_admin", "manager"] };
  }
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
