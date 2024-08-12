import { ncashService } from "../../../services/index.js";
/**
 * Look up nCash
 * @param req
 * @param res
 * @param next
 */
export const lookupNcash = async (req, res, next) => {
  try {
    //const reqBody = req.body;

    //Start: netpoint Ncash
    // const password = "XQACZXUNO9B6G81T";
    // const postData = { affiliate_directory: "paybang" };
    // postData.WORK_CODE = "C110";
    // postData.VENDOR_ID = "1961";
    // postData.BIZ_ID = "20779";
    // postData.ETC = "";

    const password = "FEONE2WG24YPBN6P";
    const postData = { WORK_CODE: "A100" };
    postData.VENDOR_ID = "1914";
    postData.BIZ_ID = "19982";
    postData.ETC = "";
    postData.CERT_TYPE = "IP";
    postData.USER_WEBTK = "";
    postData.USER_CI = "";
    postData.USER_ID = "guptest22051";
    postData.USER_PASS = "asdf";

    const ack = await ncashService.lookup(postData, password);
    //End: netpoint Ncash

    return res.ok({
      results: ack,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
