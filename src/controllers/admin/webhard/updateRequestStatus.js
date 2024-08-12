import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";
import { webhardService } from "../../../services/index.js";
/**
 * Update request status of affiliate
 * @param req
 * @param res
 * @param next
 */

export const updateRequestStatus = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    const id = reqBody.id ? reqBody.id : null;
    if (!id) throw StatusError.badRequest(res.__("transaction id is required"));

    const existingData = await model.db.ncashExchange.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: model.db.business,
          attributes: ["gubun", "memo"],
        },
      ],
    });

    if (!existingData) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    const status = reqBody.status;
    if (existingData.request_type === "pending") {
      const updatedData = {
        request_status: status,
        confirmed_at: await customDateTimeHelper.getCurrentDateTime(),
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
        updated_by: userId,
      };

      await model.db.ncashExchange.update(updatedData, {
        where: {
          id: id,
        },
      });

      if (status === "completed") {
        const ngsHistoryCashData = {
          ucode: existingData.ucode ? existingData.ucode : "0",
          business_id: existingData.business_id ? existingData.business_id : "0",
          btype: existingData.btype ? existingData.btype : "0",
          cash: existingData.cash ? existingData.cash : "0",
          check_cash: "0",
          total_cash:
            (await webhardService.calculateTotalCashForUser(
              existingData.vendor_id,
              existingData.ucode,
            )) || "0",
          tid: existingData.tid ? existingData.tid : null,
          gubun:
            existingData.business && existingData.business.gubun
              ? existingData.business.gubun
              : null,
          refund_key: "0",
          title: existingData.title ? existingData.title : "",
          memo:
            existingData.business && existingData.business.memo ? existingData.business.memo : null,
          ref_ip: existingData.ref_ip ? existingData.ref_ip : null,
          vendor_id: existingData.vendor_id ? existingData.vendor_id : "0",
          vendor_userkey: existingData.vendor_userkey ? existingData.vendor_userkey : null,
          reg_day: existingData.created_at
            ? existingData.created_at
            : await customDateTimeHelper.getCurrentDateTime(),
          reg_milisec:
            (await customDateTimeHelper.extractTimeFromDate(existingData.created_at)) || null, // need to update
          blind_yn: "Y",
          status: "active",
          created_at: await customDateTimeHelper.getCurrentDateTime(),
          updated_by: userId,
        };
        const existingCashHistory = await model.db.cashHistory.findOne({
          where: {
            ucode: ngsHistoryCashData.ucode,
            vendor_id: ngsHistoryCashData.vendor_id,
          },
        });

        if (existingCashHistory) {
          await model.db.cashHistory.update(ngsHistoryCashData, {
            where: {
              ucode: ngsHistoryCashData.ucode,
              vendor_id: ngsHistoryCashData.vendor_id,
            },
          });
        } else {
          await model.db.cashHistory.create(ngsHistoryCashData);
        }
      }
    }
    return res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
