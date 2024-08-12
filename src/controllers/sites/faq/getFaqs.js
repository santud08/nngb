import Sequelize from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

const { faq, faqCategory } = model.db;

/**
 * FAQ list
 * @param req
 * @param res
 * @param next
 */
export const getFaqs = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : "";

    let includeConditions = { status: "active" };
    let includeSubConditions = { status: "active" };
    if (searchParamsInput && searchParamsInput.panel) {
      includeConditions.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };

      includeSubConditions.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };
    }

    if (searchParamsInput && searchParamsInput.faq_category_id) {
      includeConditions.faq_category_id = {
        [Sequelize.Op.eq]: `${searchParamsInput.faq_category_id}`,
      };
    }

    const includeQuery = [
      {
        model: faqCategory,
        attributes: ["id", "faq_category_name"],
        where: includeSubConditions,
        required: false,
      },
    ];

    const selectAttributes = ["id", "faq_title", "faq_description"];

    //Rows with pagination
    const data = await paginationService.pagination(
      searchParams,
      faq,
      includeQuery,
      includeConditions,
      selectAttributes,
    );

    let includeSubConditionsCategory = { status: "active" };
    if (searchParamsInput && searchParamsInput.panel) {
      includeSubConditionsCategory.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };
    }
    //Category list
    data.category_list = await faqCategory.findAll({
      where: includeSubConditionsCategory,
      left: true,
      subQuery: false,
      attributes: ["id", "faq_category_name"],
      include: [],
    });

    return res.ok({
      results: data,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
