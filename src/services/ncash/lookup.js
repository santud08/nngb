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
function getRandomStr(characters, length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
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

export const lookup = async (postParams, password) => {
  // Generate the encryption key
  let encryptKey = password.slice(0, 8) + new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // Generate the initialization vector (IV)
  let encryptIv = new Date().toISOString().slice(0, 10).replace(/-/g, "") + password.slice(8, 16);

  console.log("EncryptKey:", encryptKey);
  console.log("EncryptIv:", encryptIv);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const randomStr = getRandomStr("1aA", 2);
  const strWORKSERIAL = dateTime.substring(0, 14) + randomStr;
  console.log("Workserial", strWORKSERIAL);
  const postData = `<?xml version='1.0' encoding='utf-8' ?>
      <EXCHANGE>
      <WORK_SERIAL>${strWORKSERIAL}</WORK_SERIAL>
        <WORK_CODE>${postParams.WORK_CODE}</WORK_CODE>
        <VENDOR_ID>${postParams.VENDOR_ID}</VENDOR_ID>
        <BIZ_ID>${postParams.BIZ_ID}</BIZ_ID>
        <ETC>${postParams.ETC}</ETC>
        <CERT_TYPE>${postParams.CERT_TYPE}</CERT_TYPE>
        <USER_WEBTK>${postParams.USER_WEBTK}</USER_WEBTK>
        <USER_CI>${postParams.USER_CI}</USER_CI>
        <USER_ID>${postParams.USER_ID}</USER_ID>
        <USER_PASS>${postParams.USER_PASS}</USER_PASS>
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
  //const url = `http://ex.netpoint.co.kr/cbiz/exearn/exEarn.jsp?send_data=${strEncRequestXml}`;
  //const url = `https://pay.filejo.com/netpoint/point_server.php`;
  const url = `http://webhard.gfile.co.kr/netpoint/point_server.php`;
  console.log("URL: ", url);
  //let sendData = `${strEncRequestXml}`
  //const data = { SEND_DATA: strEncRequestXml };
  const data = new URLSearchParams();
  data.append("SEND_DATA", strEncRequestXml);

  const response = await axios.post(url, data, {
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
