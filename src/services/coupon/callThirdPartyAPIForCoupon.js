import axios from "axios";
import { encryptData, decryptData } from "./index.js";

export const callThirdPartyAPIForCoupon = async (apiUrl, postData, api_id) => {
  console.log("apiUrl=====>", apiUrl, "api_id======>", api_id);
  const encryptionKey = "1234567890ABCDEFGHIJKLMNOPQRSTUV";
  const iv = "1234567890ABCDEF";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const req_dt = `${year}${month}${day}${hours}${minutes}${seconds}`;
  console.log("req_dt------->", req_dt);

  let encryptedData;

  encryptedData = encryptData(postData, encryptionKey, iv);
  const JsonData = JSON.stringify(encryptedData);
  console.log("encryptedData to send ========>", JsonData);
  // let v = { srdt: "bw4hLfl3dSffD8if9wvEKg==" };
  // console.log(decryptData(v, encryptionKey, iv));
  // POST request to call the third-party API using Axios
  try {
    console.log("----------------------------");
    const response = await axios.post(apiUrl, JsonData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "accept-charset": "utf-8",
        api_id: api_id,
        auth_token: "bvdtjAodY2i5WFxWOVnL0Q==",
        auth_cd: "0702",
        req_dt: req_dt,
        enc_yn: "Y",
      },
      timeout: 5000,
    });
    const couponResponseData = response.data;
    console.log("Coupon response data:", couponResponseData);

    if (couponResponseData !== null) {
      console.log(" enter in to couponResponseData block ");

      if (Array.isArray(couponResponseData.couponlist)) {
        console.log("enter in to couponlist block");
        if (couponResponseData.couponlist.length === 0) {
          console.log("couponlist array is empty");
          return couponResponseData; // or return an appropriate response
        }
        const couponlist = couponResponseData.couponlist.map((coupon) => {
          const decryptedCouponDetails = decryptData(coupon, encryptionKey, iv);
          console.log("decryptedCouponDetails", decryptedCouponDetails);
          return {
            ...coupon,
            decryptedCouponData: decryptedCouponDetails,
          };
        });
        return {
          couponlist,
        };
      } else if (Array.isArray(couponResponseData.couponinfo)) {
        console.log("enter in to couponinfo block");
        if (couponResponseData.couponinfo.length === 0) {
          console.log("couponinfo array is empty");
          return couponResponseData; // or return an appropriate response
        }
        let cupnno = { cupn_no: couponResponseData.couponinfo[0].cupn_no };
        let decryptedCouponCode = decryptData(cupnno, encryptionKey, iv);
        console.log("decryptedCouponCode", decryptedCouponCode);
        return {
          ...couponResponseData,
          decrypted: decryptedCouponCode,
        };
      }
    } else {
      console.log("Response data is null. Cannot decrypt.");
      return null; // or handle the null case accordingly
    }
  } catch (error) {
    let errorDetails;
    if (error.response) {
      // Error with a response received from the server
      const { status, data, headers } = error.response;
      errorDetails = {
        status,
        data,
        headers,
      };
    } else if (error.request) {
      // Error without a response received from the server (e.g., network issue)
      const { currentUrl } = error.request;
      errorDetails = { request: { currentUrl } };
    } else {
      // Other non-specific error
      console.log("Error:", error.message);
    }
    return { success: false, error: errorDetails || "Unknown error occurred" };
  }
};
