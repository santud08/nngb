import Sequelize from "sequelize";
import { sequelize } from "../../../config/database.js";
import { eTicketCodeService } from "../../../services/index.js";
import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";

const { eTicketCode, eTicketCodeCategory } = model.db;

/**
 * view coupon
 * @param req
 * @param res
 * @param next
 */
export const viewCoupon = async (req, res, next) => {
  try {
    const reqParam = req.params;

    const getInfo = await eTicketCodeService.getETicketCode({
      e_ticket_code_id: reqParam.id,
    });
    if (!getInfo) throw StatusError.badRequest("invalidId");

    let includeConditions = { status: "active" };
    if (reqParam && reqParam.id) {
      includeConditions.id = {
        [Sequelize.Op.eq]: `${reqParam.id}`,
      };
    }

    let includeSubConditions = { status: "active" };
    const includeQuery = [
      {
        model: eTicketCodeCategory,
        attributes: ["id", "category_name"],
        where: includeSubConditions,
        required: false,
      },
    ];

    const selectAttributes = [
      "id",
      "ticket_code",
      "ticket_name",
      "price",
      "img_url",
      "detail",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("eTicketCode.created_at"), "%Y-%m-%d"),
        "created_at",
      ],
    ];

    const data = await eTicketCode.findOne({
      where: includeConditions,
      include: includeQuery,
      attributes: selectAttributes,
    });

    return res.ok({
      results: data,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
