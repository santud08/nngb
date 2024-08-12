import * as models from "../../../models/index.js";

/**
 * users
 * @param req
 * @param res
 */
export const users = async (req, res, next) => {
  try {
    // Get parent category
    const userList = await models.dbO.user.findAll();
    const userList1 = await models.db.user.findAll();
    res.ok({
      results: { oracle_user: userList, mariadb_user: userList1 },
      //results: { mariadb_user: userList1 },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
