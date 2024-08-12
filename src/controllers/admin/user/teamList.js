import * as model from "../../../models/index.js";

/**
 * team List
 * @param req
 * @param res
 */
export const teamList = async (req, res, next) => {
  try {
    const teams = await model.db.team.findAll({
      attributes: [["id", "team_id"], "team_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: teams,
    });
  } catch (error) {
    next(error);
  }
};
