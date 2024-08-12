import * as model from "../../models/index.js";
import { StatusError } from "../../config/index.js";

export const verifyAccess = async (slug, user_id) => {
  const conditions = { menu_alias: slug };

  const result = await model.db.menu.findOne({
    where: conditions,
    attributes: ["id"],
    raw: true,
  });

  if (!result) throw StatusError.forbidden("");
  const new_condition = { menu_id: result.id, user_id: user_id, status: "active" };
  const access = await model.db.userMenu.findOne({
    where: new_condition,
  });
  return access;
};
