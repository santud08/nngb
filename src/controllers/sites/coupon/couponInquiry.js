import { couponService } from "../../../services/index.js";

export const couponInquiry = async (req, res) => {
  console.log("------------- Start couponInquiry -------------");
  try {
    console.log("Start the coupon inquiry process");
    const reqBody = req.body;
    const endPoint = "gsmapi/coupon/searchdt";
    const apiUrl = `https://t-api.gsncoupon.com/${endPoint}`;
    const postData = {
      search_start_dt: reqBody.search_start_dt,
      search_end_dt: reqBody.search_end_dt,
    };

    try {
      const response = await couponService.callThirdPartyAPIForCoupon(
        apiUrl,
        postData,
        "IF-GSM-002",
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
