import { Op } from "sequelize";
import * as model from "../../../models/index.js";
/**
 * vendor list
 * @param req
 * @param res
 * @param next
 */

export const vendorList = async (req, res, next) => {
  try {
    const searchText = req.query.search_text || "";

    const searchConditions = {
      status: "active",
      [Op.and]: [
        {
          customer_name: {
            [Op.like]: `%${searchText}%`,
          },
        },
        {
          vendor_type: "affiliate",
        },
      ],
    };
    const vendorLists = await model.db.customer.findAll({
      attributes: [
        ["id", "vendor_id"],
        ["customer_name", "vendor_name"],
      ],
      where: searchConditions,
      raw: true,
    });

    res.ok({
      results: vendorLists,
    });
  } catch (error) {
    next(error);
  }
};
