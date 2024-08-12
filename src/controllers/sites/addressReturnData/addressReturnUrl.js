import { addressDataService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * Get address Return Data From Third party url
 * @param req
 * @param res
 * @param next
 */

export const addressReturnUrl = async (req, res, next) => {
  try {
    //console.log(req.body);
    var roadAddrPart1 = req.body.roadAddrPart1 ? req.body.roadAddrPart1 : "";
    var roadAddrPart2 = req.body.roadAddrPart2 ? req.body.roadAddrPart2 : "";
    var roadFullAddr = req.body.roadFullAddr ? req.body.roadFullAddr : "";
    var zipNo = req.body.zipNo ? req.body.zipNo : "";
    var addrDetail = req.body.addrDetail ? req.body.addrDetail : "";
    var addressData = { roadAddrPart1, roadAddrPart2, roadFullAddr, zipNo, addrDetail };
    var testAddr = JSON.stringify(addressData);
    console.log(testAddr);
    const resData = await addressDataService.addressDataService(testAddr);
    console.log("4. After Service", resData);
    if (resData && resData.status && resData.status == "success" && resData.datas) {
      console.log("5. Frontend response", resData.datas);
      const popHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        Retrieving Address...

        <script type="text/javascript">
        
        window.opener.postMessage(${JSON.stringify(resData.datas)},"*");
         setTimeout(() => {
           window.close()
         }, 2000);
      </script>
        </body>
        </html>
        `;
      res.ok(popHtml);
    } else {
      if (resData && resData.error && resData.error.sRtnMSG) {
        resData.error.sRtnMSG = res.__(resData.error.sRtnMSG);
        throw StatusError.badRequest({ error: resData.error });
      } else {
        throw StatusError.badRequest(res.__("serverError"));
      }
    }
  } catch (error) {
    next(error);
  }
};
