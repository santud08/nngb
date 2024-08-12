import * as model from "../../models/index.js";

export const checkUserAccess = async (userId, menu) => {
  const menus = menu
    ? await model.db.menu.findOne({
        attributes: ["id"],
        where: { menu_key: menu, status: "active" },
      })
    : null;
  const menuId = menus ? menus.id : "";
  const conditions = { user_id: userId, menu_id: menuId, status: "active" };
  const result = await model.db.userMenu.findOne({
    where: conditions,
    raw: true,
  });

  return result && result != null && result != "undefined" ? true : false;
};
