import { ncashService } from "../../../services/index.js";
/**
 * Earn nCash
 * @param req
 * @param res
 * @param next
 */
export const earnNcash = async (req, res, next) => {
  try {
    //const reqBody = req.body;

    //Start: netpoint Ncash
    // const password = "XQACZXUNO9B6G81T";
    // const postData = { affiliate_directory: "paybang" };
    // postData.WORK_CODE = "C110";
    // postData.VENDOR_ID = "1961";
    // postData.BIZ_ID = "20779";
    // postData.ETC = "";

    const password = "38R1BHVNRMXAR78U";
    const postData = { WORK_CODE: "N110" };
    postData.VENDOR_ID = "1922";
    postData.BIZ_ID = "20026";
    postData.ETC = "";
    postData.CERT_TYPE = "IP";
    postData.USER_WEBTK = "";
    postData.USER_CI = "";
    postData.USER_ID = "netpointtest";
    postData.USER_PASS = "a123456789";
    postData.TOTAL_BALANCE = "40000";
    postData.AVAIL_BALANCE = "40000";
    postData.AMOUNT = "2000";
    postData.TRADE_KEY = "a12345678910111213141617181920";
    postData.AFTER_BALANCE = "42000";

    const ack = await ncashService.earn(postData, password);
    //End: netpoint Ncash

    return res.ok({
      results: ack,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
