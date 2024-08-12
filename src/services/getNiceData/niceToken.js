import { envs } from "../../config/index.js";
import { exec } from "child_process";

export const niceToken = async () => {
  try {
    const sSiteCode = `${envs.NICE_TOKEN_API.SITE_CODE}`;
    const sSitePW = `${envs.NICE_TOKEN_API.SITE_PASSWORD}`;
    const sModulePath = `${envs.NICE_TOKEN_API.MODULE_PATH}`;

    const sAuthType = "";
    const sCustomize = "";
    const sReturnUrl = `${envs.NICE_TOKEN_API.RETURN_URL}`;
    const sErrorUrl = `${envs.NICE_TOKEN_API.ERROR_URL}`;

    const d = new Date();
    const sCPRequest = sSiteCode + "_" + d.getTime();

    //전달 원문 데이터 초기화
    let sPlaincData = "";
    //전달 암호화 데이터 초기화
    let sEncData = "";
    //처리 결과 메시지
    let sRtnMSG = "";

    sPlaincData =
      "7:REQ_SEQ" +
      sCPRequest.length +
      ":" +
      sCPRequest +
      "8:SITECODE" +
      sSiteCode.length +
      ":" +
      sSiteCode +
      "9:AUTH_TYPE" +
      sAuthType.length +
      ":" +
      sAuthType +
      "7:RTN_URL" +
      sReturnUrl.length +
      ":" +
      sReturnUrl +
      "7:ERR_URL" +
      sErrorUrl.length +
      ":" +
      sErrorUrl +
      "9:CUSTOMIZE" +
      sCustomize.length +
      ":" +
      sCustomize;
    //console.log("[" + sPlaincData + "]");

    const cmd = sModulePath + " " + "ENC" + " " + sSiteCode + " " + sSitePW + " " + sPlaincData;

    const exAsync = (cmd) => {
      const child = exec(cmd, { encoding: "euc-kr" });
      return new Promise((resolve, reject) => {
        child.stdout.on("data", function (data) {
          sEncData += data;
        });
        child.on("close", function () {
          //console.log(sEncData);
          //이곳에서 result처리 해야함.

          //처리 결과 확인
          if (sEncData == "-1") {
            sRtnMSG = "암/복호화 시스템 오류입니다.";
          } else if (sEncData == "-2") {
            sRtnMSG = "암호화 처리 오류입니다.";
          } else if (sEncData == "-3") {
            sRtnMSG = "암호화 데이터 오류 입니다.";
          } else if (sEncData == "-9") {
            sRtnMSG = "입력값 오류 : 암호화 처리시, 필요한 파라미터 값을 확인해 주시기 바랍니다.";
          } else {
            sRtnMSG = "";
          }
          if (sRtnMSG != "") {
            reject({
              status: "error",
              error: {
                sRtnMSG: sRtnMSG,
                requestnumber: "",
                authtype: "",
                errcode: "",
              },
            });
          } else {
            const tokenInfo = { sEncData, sRtnMSG };
            resolve({ status: "success", tokenInfo });
          }
        });
      });
    };
    return await exAsync(cmd);
  } catch (error) {
    return {
      status: "error",
      error: {
        sRtnMSG: "Input error",
        requestnumber: "",
        authtype: "",
        errcode: "",
      },
    };
  }
};
