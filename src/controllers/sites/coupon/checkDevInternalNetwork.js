import { couponService } from "../../../services/index.js";
import { getRandomStringHelper } from "../../../helpers/index.js";

export const checkDevInternalNetwork = async (req, res) => {
  console.log("------------- Start checkOperatePublicNetwork -------------");
  try {
    console.log("Start the process for coupon issuing and sending");
    const endPoint = "gsmapi/coupon/issuesend";
    const apiUrl = `https://t-managerapi.gsncoupon.com:32443/${endPoint}`;

    let reqBody = req.body;
    let vendorCode = "0702";
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const endmonth = String(currentDate.getMonth() + 2).padStart(2, "0");

    const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    const randomStr = getRandomStringHelper.generateRandomString("0123456789", 5);
    let clico_issu_paym_no = `${vendorCode}${dateTime}${randomStr}`;
    let avl_start_dy = "";
    let avl_end_dy = "";
    if (reqBody.avl_div_cd == "01") {
      avl_start_dy = `${year}${month}${day}`;
      avl_end_dy = `${year}${endmonth}${day}`;
    }
    let postData = {
      req_div_cd: reqBody.req_div_cd, //01 for GSMBiz product code,02 for Customer product code
      issu_req_val: reqBody.issu_req_val, //product code provided by GSM Biz
      clico_issu_paym_no: clico_issu_paym_no, //Clico_Cd+YYYYMMDDHH24MISS+Seq(5)
      clico_issu_paym_seq: reqBody.clico_issu_paym_seq, //1 for single coupon and 2 for two coupon and so on
      cre_cnt: reqBody.cre_cnt, //1 for single coupon and 2 for two coupon and so on
      rcvr_telno: reqBody.rcvr_telno,
      sndr_telno: reqBody.sndr_telno,
      title: reqBody.title,
      body_top_add_msg: reqBody.body_top_add_msg,
      avl_div_cd: reqBody.avl_div_cd, //if 1 need to set start and end date
      avl_start_dy: avl_start_dy,
      avl_end_dy: avl_end_dy,
    };

    try {
      const response = await couponService.callThirdPartyAPIForCoupon(
        apiUrl,
        postData,
        "IF-GSM-102",
      );
      console.log("Response received:", response);

      // Check if the response indicates success
      if (response.success) {
        return res.ok({
          results: response.data, // Assuming the data is available in the response
        });
      } else {
        // Handle the error case
        console.log("Error occurred in api response:", response.error);
        return res.json({
          success: false,
          error: response.error || "Internal server error",
        });
      }
    } catch (error) {
      console.log("Error occurred:", error);
      return res.json({
        success: false,
        error: error || "Error occurred in internal try catch block",
      });
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return res.json({
      success: false,
      error: error || "Error occurred in outer try catch block",
    });
  }
};
