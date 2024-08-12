import { StatusError } from "../../config/index.js";
import { BANK_ID } from "../../utils/constants.js";
import net from "net";

/**
 * checkId
 * @param token
 * @param tokenSecret
 */
export const checkId = (params) => {
  try {
    const socket = net.createConnection({
      host: BANK_ID.SOCKET_HOST,
      port: BANK_ID.SOCKET_PORT,
      timeout: BANK_ID.SOCKET_TIMEOUT,
    });

    return new Promise((resolve, reject) => {
      socket.on("connect", () => {
        console.log("Socket connected");
        const requestedValue = new URLSearchParams(params).toString();
        let targetUrl = BANK_ID.TARGET_URL;
        if (params && params.strCharset && params.strCharset.toUpperCase() == "UTF-8") {
          targetUrl = BANK_ID.TARGET_URL_UTF;
        }

        const request =
          "POST " +
          targetUrl +
          " HTTP/1.1\r\n" +
          "Host: " +
          BANK_ID.SOCKET_HOST +
          "\r\n" +
          "Content-Type: application/x-www-form-urlencoded\r\n" +
          "Content-Length: " +
          Buffer.byteLength(requestedValue) +
          "\r\n" +
          "Connection: close\r\n" +
          "\r\n" +
          requestedValue;
        socket.write(request);
      });
      socket.on("error", (error) => {
        reject(error);
      });

      socket.on("data", (data) => {
        try {
          let result = null;
          if (data) {
            result = data.toString("utf-8").split("\r\n");
            if (
              result != "undefined" &&
              result != null &&
              result &&
              result.length > 0 &&
              result[8] &&
              result[8] != null &&
              result[8] != "undefined"
            ) {
              result = result[8].split("|");
              if (result != null && result != "undefined" && result && result.length > 0) {
                result = {
                  strOrderNo: result[0] ? result[0] : null,
                  resCode: result[1] ? result[1] : null,
                  message: result[2] ? result[2] : null,
                };
              } else {
                result = {
                  strOrderNo: null,
                  resCode: null,
                  message: "No data received in the api response. please try again!",
                };
              }
            } else {
              result = {
                strOrderNo: null,
                resCode: null,
                message: "No data received in the api response. please try again!",
              };
            }
          }
          console.log(`Received data: ${data}`);
          resolve(result);
        } catch (error) {
          console.error("Error while parsing data:", error);
          // Handle this error as needed
          reject(error);
        }
      });

      socket.on("close", () => {
        console.log("Socket closed");
      });
    });
  } catch (error) {
    throw StatusError.forbidden("");
  }
};
