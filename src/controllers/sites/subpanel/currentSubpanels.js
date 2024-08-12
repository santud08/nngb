import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

/**
 * currentSubpanels list
 * @param req
 * @param res
 * @param next
 */
export const currentSubpanels = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : null;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    let searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    const conditions = { status: "active" };
    const includes = [
      {
        model: model.db.subpanelUserJoined,
        required: true,
        where: { is_joined: "y", user_id: userId, status: "active" },
        attributes: [],
      },
    ];

    const selectAttributes = ["id", "subpanel_title"];

    //Rows with pagination
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.subpanel,
      includes,
      conditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: resultData.count,
      total_pages: resultData.count > 0 ? Math.ceil(resultData.count / limit) : 0,
      results: resultData.rows,
    });
  } catch (error) {
    next(error);
  }
};
