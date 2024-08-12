import { ncashService } from "../../../services/index.js";
/**
 * Confirm nCash
 * @param req
 * @param res
 * @param next
 */
export const confirmNcash = async (req, res, next) => {
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
    const postData = { WORK_CODE: "T110" };
    postData.VENDOR_ID = "1922";
    postData.BIZ_ID = "20026";
    postData.ETC = "";
    postData.AMOUNT = "40000";
    postData.TRADE_KEY = "a12345678910111213141617181921";

    const ack = await ncashService.confirm(postData, password);
    //End: netpoint Ncash

    return res.ok({
      results: ack,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
