import axios from "axios";
import xml2js from "xml2js";
import crypto from "crypto";

const parser = new xml2js.Parser({ explicitArray: false });

/////////////////////////
// function encrypt(iv, key, str) {
//   const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
//   let encrypted = cipher.update(str, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return encrypted;
// }

// function decrypt(iv, key, code) {
//   const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
//   let decrypted = decipher.update(code, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// }

function encrypt(iv, key, str) {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  cipher.setAutoPadding(false); // Disable automatic padding
  const paddingLength = 16 - (str.length % 16);
  const paddedStr = str + String.fromCharCode(paddingLength).repeat(paddingLength);
  let encrypted = cipher.update(paddedStr, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(iv, key, code) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  decipher.setAutoPadding(false); // Disable automatic padding
  let decrypted = decipher.update(code, "hex", "utf8");
  decrypted += decipher.final("utf8");
  // Remove padding
  const paddingLength = decrypted.charCodeAt(decrypted.length - 1);
  decrypted = decrypted.slice(0, -paddingLength);
  return decrypted;
}

export const earn = async (postParams, password) => {
  // Generate the encryption key
  let encryptKey = password.slice(0, 8) + new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // Generate the initialization vector (IV)
  let encryptIv = new Date().toISOString().slice(0, 10).replace(/-/g, "") + password.slice(8, 16);

  console.log("EncryptKey:", encryptKey);
  console.log("EncryptIv:", encryptIv);

  const postData = `<?xml version='1.0' encoding='utf-8' ?>
      <EXCHANGE>
        <WORK_CODE>${postParams.WORK_CODE}</WORK_CODE>
        <VENDOR_ID>${postParams.VENDOR_ID}</VENDOR_ID>
        <BIZ_ID>${postParams.BIZ_ID}</BIZ_ID>
        <ETC>${postParams.ETC}</ETC>
        <CERT_TYPE>${postParams.CERT_TYPE}</CERT_TYPE>
        <USER_WEBTK>${postParams.USER_WEBTK}</USER_WEBTK>
        <USER_CI>${postParams.USER_CI}</USER_CI>
        <USER_ID>${postParams.USER_ID}</USER_ID>
        <USER_PASS>${postParams.USER_PASS}</USER_PASS>
        <TOTAL_BALANCE>${postParams.TOTAL_BALANCE}</TOTAL_BALANCE>
        <AVAIL_BALANCE>${postParams.AVAIL_BALANCE}</AVAIL_BALANCE>
        <AMOUNT>${postParams.AMOUNT}</AMOUNT>
        <TRADE_KEY>${postParams.TRADE_KEY}</TRADE_KEY>
        <AFTER_BALANCE>${postParams.AFTER_BALANCE}</AFTER_BALANCE>
      </EXCHANGE>`;

  console.log("전송할 xml데이터 : \n", postData, "\n");

  //const postData = "This is Test Text!";

  const strEncRequestXml = encrypt(encryptIv, encryptKey, postData);

  console.log("전송 데이터 암호화 : ", strEncRequestXml, "\n");

  /////Test
  // const resDecResponseXml = decrypt(encryptIv, encryptKey, strEncRequestXml);
  // console.log("전송 데이터 암호화 : ", resDecResponseXml, "\n");
  /////Test
  //process.exit();

  //const url = `http://ex.netpoint.co.kr/cbiz/ExAPIServer/${postParams.affiliate_directory}/APIServerV11_earn.jsp?SEND_DATA=${strEncRequestXml}`;
  const url = `http://ex.netpoint.co.kr/cbiz/exearn/exEarn.jsp?send_data=${strEncRequestXml}`;
  console.log("URL: ", url);
  const response = await axios.post(url, null, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 5000,
  });
  console.log("Response : ", response);
  const strResponseText = response.data;

  console.log("응답데이터 : ", strResponseText, "\n");

  if (strResponseText) {
    const strDecResponseXml = decrypt(encryptIv, encryptKey, strResponseText);
    console.log("응답데이터 복호화 : \n", strDecResponseXml, "\n");

    parser.parseString(strDecResponseXml, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      console.log(result);

      if (result && result.EXCHANGE) {
        const { WORK_CODE, VENDOR_ID, BIZ_ID, RESULT_CODE } = result.EXCHANGE;

        console.log("xml 파싱 결과 : \n");
        console.log("workCode :", WORK_CODE, "\n");
        console.log("vendorID :", VENDOR_ID, "\n");
        console.log("bizID :", BIZ_ID, "\n");
        console.log("resultCode :", RESULT_CODE, "\n");
      }

      return result;
    });
  }
};
