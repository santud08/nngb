import { couponService } from "../../../services/index.js";

export const issuenceOfCoupon = async (req, res) => {
  console.log("------------- Start couponIssues -------------");
  try {
    console.log("issuence of coupon");
    const reqBody = req.body;
    const endPoint = "gsmapi/coupon/issue";
    const apiUrl = `https://t-api.gsncoupon.com/${endPoint}`;
    const postData = {
      req_div_cd: reqBody.req_div_cd,
      issu_req_val: reqBody.issu_req_val,
      clico_issu_paym_no: reqBody.clico_issu_paym_no,
      clico_issu_paym_seq: reqBody.clico_issu_paym_seq,
      cre_cnt: reqBody.cre_cnt,
      avl_div_cd: reqBody.avl_div_cd,
      avl_start_dy: reqBody.avl_start_dy ? reqBody.avl_start_dy : "",
      avl_end_dy: reqBody.avl_end_dy ? reqBody.avl_end_dy : "",
      crd_join_yn: reqBody.crd_join_yn ? reqBody.crd_join_yn : "",
      cmpn_cd: reqBody.cmpn_cd ? reqBody.cmpn_cd : "",
      cust_no: reqBody.cust_no ? reqBody.cust_no : "",
      usable_mcht_cd: reqBody.usable_mcht_cd ? reqBody.usable_mcht_cd : "",
    };

    try {
      const response = await couponService.callThirdPartyAPIForCoupon(
        apiUrl,
        postData,
        "IF-GSM-101",
      );
      console.log("Response received:", response);

      // Check if the response indicates success
      if (response) {
        return res.ok({
          results: response, // Assuming the data is available in the response
        });
      } else {
        // Handle the error case
        console.log("Error occurred in api response:", response.error);
        return res.json({
          success: false,
          error: "No response received",
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
