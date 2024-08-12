import * as model from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { StatusError } from "../../../config/index.js";

/**
 * Get all affiliate
 * @param req
 * @param res
 * @param next
 */

export const affiliateList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const vendorId = reqBody.vendor_id;
    if (!vendorId) throw StatusError.badRequest(res.__("Vendor id is required"));
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      queryLog: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    // use stored procedure for calculation no_of_approval

    const updatedAffiliate = await model.db.ncashExchange.findAll();

    await Promise.all(
      updatedAffiliate.map(async (affiliate) => {
        const ucode = affiliate.ucode;
        const affiliateVendorId = affiliate.vendor_id;
        await model.db.sequelize.query(
          "CALL calculate_and_update_approval_count(:ucode_val, :vendor_id_val);",
          {
            replacements: { ucode_val: ucode, vendor_id_val: affiliateVendorId },
            type: model.db.sequelize.QueryTypes.RAW,
          },
        );
      }),
    );

    // Fetch the transaction list for a particular user's last completed record on specific vendor

    const lastCompletedRecords = await model.db.ncashExchange.findAll({
      attributes: [
        "ucode",
        [Sequelize.fn("MAX", Sequelize.col("confirmed_at")), "last_completed_date"],
      ],
      where: {
        status: "active",
        request_status: {
          [Op.in]: ["completed"],
        },
        vendor_id: vendorId,
      },
      group: ["ucode"],
    });

    const orConditions = [];

    for (const record of lastCompletedRecords) {
      const confirmedAt = record.dataValues.last_completed_date;
      const ucode = record.dataValues.ucode;
      orConditions.push({
        [Op.or]: [
          {
            request_status: {
              [Op.in]: ["pending"],
            },
          },
          {
            ucode: ucode,
            request_status: "completed",
            confirmed_at: confirmedAt,
          },
        ],
      });
    }

    const conditions = {
      status: "active",
      [Op.or]: orConditions,
      vendor_id: vendorId,
    };

    if (searchParamsInput && searchParamsInput.transaction_id) {
      conditions.tid = searchParamsInput.transaction_id;
    }

    if (searchParamsInput && searchParamsInput.ucode) {
      conditions.ucode = searchParamsInput.ucode;
    }

    if (searchParamsInput && searchParamsInput.membership_value) {
      conditions.vendor_userkey = searchParamsInput.membership_value;
    }

    if (
      searchParamsInput &&
      searchParamsInput.current_status &&
      Array.isArray(searchParamsInput.current_status) &&
      searchParamsInput.current_status.length > 0
    ) {
      if (searchParamsInput.current_status.includes("refuse")) {
        const lastRefusesRecords = await model.db.ncashExchange.findAll({
          attributes: [
            "ucode",
            [Sequelize.fn("MAX", Sequelize.col("confirmed_at")), "last_refused_date"],
          ],
          where: {
            status: "active",
            request_status: {
              [Op.in]: ["refuse"],
            },
            vendor_id: vendorId,
          },
          group: ["ucode"],
        });

        for (const record of lastRefusesRecords) {
          const confirmedAt = record.dataValues.last_refused_date;
          const ucode = record.dataValues.ucode;
          orConditions.push({
            [Op.or]: [
              {
                request_status: {
                  [Op.in]: ["pending"],
                },
              },
              {
                ucode: ucode,
                request_status: "refuse",
                confirmed_at: confirmedAt,
              },
            ],
          });
        }
      }
      conditions.request_status = {
        [Op.in]: searchParamsInput.current_status,
      };
    }

    if (searchParamsInput && searchParamsInput.reg_start_date && !searchParamsInput.reg_end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("ncashExchange.created_at")),
        {
          [Op.gte]: searchParamsInput.reg_start_date,
        },
      );
    } else if (
      searchParamsInput &&
      !searchParamsInput.reg_start_date &&
      searchParamsInput.reg_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("ncashExchange.created_at")),
        {
          [Op.lte]: searchParamsInput.reg_end_date,
        },
      );
    } else if (
      searchParamsInput &&
      searchParamsInput.reg_start_date &&
      searchParamsInput.reg_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("ncashExchange.created_at")),
        {
          [Op.between]: [searchParamsInput.reg_start_date, searchParamsInput.reg_end_date],
        },
      );
    }

    const selectAttributes = [
      "id",
      "ucode",
      "vendor_id",
      ["vendor_userkey", "membership_value"],
      [col("user.name"), "name"],
      ["title", "exchange_content"],
      ["cash", "exchange_ncash"],
      ["confirmed_by", "administrator_id"],
      ["created_at", "request_of_approval_date"],
      ["confirmed_at", "approval_processing_date"],
      ["request_status", "current_status"],
      ["tid", "transaction_id"],
      "no_of_approval",
    ];

    const includeArray = [
      {
        model: model.db.user,
        where: { status: "active" },
        attributes: [],
      },
    ];

    const getAffiliateList = await paginationService.pagination(
      searchParams,
      model.db.ncashExchange,
      includeArray,
      conditions,
      selectAttributes,
    );

    const withdrawalTotals = await model.db.ncashExchange.findAll({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("cash")), "total_withdrawal_amount"]],
      where: {
        request_status: "completed",
      },
      group: ["vendor_userkey"],
    });

    return res.ok({
      page: page,
      limit: limit,
      total_records: getAffiliateList.count,
      total_pages: getAffiliateList.count > 0 ? Math.ceil(getAffiliateList.count / limit) : 0,
      total_withdrawl_amt:
        withdrawalTotals && withdrawalTotals.length > 0
          ? withdrawalTotals[0].dataValues.total_withdrawal_amount
          : 0,
      results: getAffiliateList.rows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
