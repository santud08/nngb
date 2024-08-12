import * as model from "../../../models/index.js";

/**
 * department List
 * @param req
 * @param res
 */
export const departmentList = async (req, res, next) => {
  try {
    const departments = await model.db.departments.findAll({
      attributes: ["id", "department_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: departments,
    });
  } catch (error) {
    next(error);
  }
};
