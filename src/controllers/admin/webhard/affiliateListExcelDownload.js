import * as model from "../../../models/index.js";
import { Sequelize, Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import ExcelJS from "exceljs";
import { customDateTimeHelper } from "../../../helpers/index.js";

export const affiliateListExcelDownload = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const vendorId = reqBody.vendor_id;
    if (!vendorId) throw StatusError.badRequest(res.__("Vendor id is required"));
    const sort_by = reqBody.sort_by || "id";
    const sort_order = reqBody.sort_order || "desc";
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

    // set conditions
    const conditions = {
      status: "active",
      [Op.or]: orConditions,
      vendor_id: vendorId,
    };

    if (searchParamsInput && searchParamsInput.transaction_id) {
      conditions.tid = searchParamsInput.transaction_id;
    }

    if (searchParamsInput && searchParamsInput.membership_value) {
      conditions.vendor_userkey = searchParamsInput.membership_value;
    }

    if (
      searchParamsInput &&
      searchParamsInput.current_status &&
      Array.isArray(searchParamsInput.current_status)
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
      "vendor_userkey",
      "title",
      "cash",
      "confirmed_by",
      "created_at",
      "confirmed_at",
      "request_status",
      "tid",
      "no_of_approval",
    ];

    const includeArray = [
      {
        model: model.db.user,
        where: { status: "active" },
        attributes: ["name"],
      },
    ];

    const getAffiliateList = await model.db.ncashExchange.findAll({
      where: conditions,
      attributes: selectAttributes,
      include: includeArray,
      order: [[sort_by, sort_order]],
    });

    // Prepare and send the Excel file with all data
    const path = "public/download_file/ncash_transaction_history/ncash_transaction";
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Transactionlist");
    worksheet.columns = [
      { header: res.__("UCode"), key: "ucode", width: 10 },
      { header: res.__("Membership Value (Affiliate)"), key: "vendor_userkey", width: 25 },
      { header: res.__("Name"), key: "name", width: 20 },
      { header: res.__("Exchange Content"), key: "title", width: 25 },
      { header: res.__("Exchange NCash"), key: "cash", width: 15 },
      { header: res.__("Administrative ID"), key: "confirmed_by", width: 15 },
      {
        header: res.__("Date of Request for Approval"),
        key: "created_at",
        width: 30,
      },
      { header: res.__("Approval Processing Date"), key: "confirmed_at", width: 25 },
      { header: res.__("Current Status"), key: "request_status", width: 15 },
      { header: res.__("Transaction ID"), key: "tid", width: 15 },
      { header: res.__("Total Number of Approval"), key: "no_of_approval", width: 25 },
    ];

    let counter = 1;
    getAffiliateList.forEach((list) => {
      list.name = list.user.dataValues.name;
      list.s_no = counter;
      worksheet.addRow(list); // Add data in worksheet
      counter++;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Generate a timestamp
    const timestamp = await customDateTimeHelper.getCurrentTimeStamp();
    const filename = `Ncash_Transaction_history_of_vendorId_${vendorId}_${timestamp}.xlsx`;

    const options = {
      encoding: "UTF-8",
      formatterOptions: { encoding: "UTF-8", writeBOM: true },
    };
    await workbook.xlsx.writeFile(`${path}${filename}`, options).then(() => {
      res.ok({
        path: Buffer.from(`${path}${filename}`).toString("hex"),
      });
    });
  } catch (error) {
    next(error);
  }
};
