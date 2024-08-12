import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * adminMenus
 * @param req
 * @param res
 * @param next
 */
export const adminMenus = async (req, res, next) => {
  try {
    const id = req.userDetails.userId ? req.userDetails.userId : "";
    if (!id) throw StatusError.badRequest(res.__("invalidId"));
    const menuList = await model.db.menu.findAll({
      attributes: [["id", "menu_id"], "menu_key", "menu_name"],
      where: { status: "active" },
    });
    return res.ok({
      results: menuList,
    });
  } catch (error) {
    next(error);
  }
};
