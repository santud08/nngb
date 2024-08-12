import { Op } from "sequelize";
import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * product category list
 * @param req
 * @param res
 * @param next
 */
export const productCategoryList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    const categoryName = reqBody.category_name ? reqBody.category_name : "";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    let conditions = { status: { [Op.ne]: "deleted" } };
    if (categoryName) {
      conditions.category_name = {
        [Op.like]: `%${categoryName}%`,
      };
    }
    let selectAttributes = [["id", "category_id"], "category_name"];
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.eTicketCodeCategory,
      [],
      conditions,
      selectAttributes,
    );

    const categoriesWithProductCounts = await Promise.all(
      resultData.rows.map(async (category) => {
        const productCount = await model.db.eTicketCode.count({
          where: {
            status: "active",
            category_id: category.dataValues.category_id,
          },
        });
        return {
          category_id: category.dataValues.category_id,
          category_name: category.dataValues.category_name,
          product_count: productCount,
        };
      }),
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: resultData.count,
      total_pages: resultData.count > 0 ? Math.ceil(resultData.count / limit) : 0,
      results: categoriesWithProductCounts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
