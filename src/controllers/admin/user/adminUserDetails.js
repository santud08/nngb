import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op, Sequelize, col } from "sequelize";

/**
 * Get admin User Details by ID
 * @param req
 * @param res
 */
export const adminUserDetails = async (req, res, next) => {
  try {
    const adminId = req.query.id ? req.query.id : null;

    if (!adminId) throw StatusError.badRequest(res.__("invalidId"));
    let admin = await models.db.adminUsers.findOne({
      attributes: [
        "id",
        "user_type",
        "status",
        col("department_name"),
        "department_id",
        "name",
        "user_name",
        "email",
        "phone",
        "mobile",
        "rank",
        "bu_id",
        "headquarter_id",
        "team_id",
        "note",
      ],
      where: {
        id: adminId,
        status: { [Op.ne]: "deleted" },
      },
      include: [
        {
          model: models.db.departments,
          attributes: [],
          where: { status: { [Op.ne]: "deleted" } },
          required: false,
        },
      ],
      raw: true,
    });

    if (!admin) throw StatusError.badRequest(res.__("invalid admin id"));

    const accessList = await models.db.menu.findAll({
      attributes: [
        [Sequelize.fn("IFNULL", Sequelize.literal("userMenus.id"), null), "access_id"],
        ["id", "menu_id"],
        "menu_key",
        "menu_name",
      ],
      where: { status: "active" },
      include: [
        {
          model: models.db.userMenu,
          required: false,
          left: true,
          attributes: [],
          where: {
            status: "active",
            user_id: adminId,
          },
        },
      ],
      order: [["id", "asc"]],
    });
    admin.user_access = accessList;

    const userIpAccessList = await models.db.ipAccessMapping.findAll({
      attributes: ["id", "ip"],
      where: { status: "active", user_id: adminId },
      order: [["id", "desc"]],
    });
    admin.user_ip_access = userIpAccessList;
    return res.ok(admin);
  } catch (error) {
    next(error);
  }
};
