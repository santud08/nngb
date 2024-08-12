import { bankCheckIdService } from "../../../services/index.js";
import { envs } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * checkBankId
 * @param req
 * @param res
 */
export const checkBankId = async (req, res, next) => {
  try {
    const reqBody = req.body;
    // Get parent category
    const niceUid = envs.BANK_ID.BANK_AC_SIDECODE;
    const svcPwd = envs.BANK_ID.BANK_AC_PASSWORD;
    //const strCharset = "EUC-KR";
    const strCharset = "UTF-8";

    const service = 2;
    const svcGbn = 2;
    const strGbn = reqBody.strGbn ? reqBody.strGbn : 1;
    const strBankCode = reqBody.strBankCode;
    const strAccountNo = reqBody.strAccountNo !== "null" ? reqBody.strAccountNo : null;
    const strNm = reqBody.name !== "null" ? reqBody.name : null;

    if (!strAccountNo || !strNm) {
      throw StatusError.badRequest(res.__("name and strAccountNo are required!"));
    }
    const getBankDetails = await models.db.bankList.findOne({
      where: { bank_code: strBankCode, status: "active" },
    });
    if (!getBankDetails) {
      throw StatusError.badRequest(res.__("No Bank List Found!"));
    }

    //DOB
    let strResId = "";
    if (reqBody.birth) {
      strResId = reqBody.birth;
    }

    //Rand
    const min = 1000000000;
    const max = 9999999999;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    //Date
    const dateString = await customDateTimeHelper.getCurrentDateTime("YYYYMMDD");
    //Order No.
    const strOrderNo = dateString + `${randomInt}`;
    console.log("strOrderNo", strOrderNo);
    const inq_rsn = "10";
    const result = await bankCheckIdService.checkId({
      strCharset,
      niceUid,
      svcPwd,
      service,
      svcGbn,
      strGbn,
      strBankCode,
      strAccountNo,
      strNm,
      strResId,
      inq_rsn,
      strOrderNo,
    });

    if (result.resCode === "0000") {
      // Success case
      res.ok({
        success: "success",
        result,
      });
    } else {
      // Handle other error cases
      throw StatusError.badRequest(result.message);
    }
  } catch (error) {
    next(error);
  }
};
