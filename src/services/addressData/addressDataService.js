import { exec } from "child_process";

export const addressDataService = async (addressData) => {
  try {
    const cmd = "clear";
    if (addressData == "") {
      console.log("1. Address (null)", addressData);
      return {
        status: "error",
        error: {
          sRtnMSG: "Input error",
          requestnumber: "",
          authtype: "",
          errcode: "",
        },
      };
    } else {
      const exAsync = (cmd) => {
        console.log("2. Address (not null)", addressData);
        //let sAddData = "";
        const child = exec(cmd, { encoding: "euc-kr" });
        return new Promise((resolve, reject) => {
          child.stdout.on("data", function () {
            //addressData += data;
          });

          child.stderr.on("data", (x) => {
            console.log("stderr", x.toString());
          });

          child.on("close", function () {
            let datas = { addressData };
            console.log("3. Address1 (not null)", datas);
            if (datas == "") {
              reject({
                status: "error",
                error: {
                  sRtnMSG: "No Data Returned ",
                  requestnumber: "",
                  authtype: "",
                  errcode: "",
                },
              });
            } else {
              resolve({ status: "success", datas });
            }
          });
        });
      };
      return await exAsync(cmd);
    }
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
