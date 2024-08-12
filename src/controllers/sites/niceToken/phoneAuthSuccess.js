import { niceResponseService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * Get nice token api
 * @param req
 * @param res
 * @param next
 */

export const phoneAuthSuccess = async (req, res, next) => {
  try {
    const sEncData = req.query.EncodeData;
    //console.log("sEncData", sEncData);
    // const sEncData =
    //   "AgAFRzA3MjOEcB3OQf/3zOh5Obom7u36X9zPCoRGW7hhIc48LTdFVIKN7ZDIBYzr2aFmIi7tMSefBiyFGIm1rLeomNG3zlcRe+sNF3rBIuXsZSuecZ438/8cuBsvkNI7XI/+B+8LZVo4wdop8+3p/qPYp+JSEq7EjnYXd1aLBkclDiYGoQZNH+6ejtVP+hmRdMnRxHztPilKJjJvsEt81qikLUEAHPmshoCjJKqHGTTk80+6D5Zlrt4i2zuMLlIF8zrxqWHZJZvnELZNF5DMwLNgwZthuaZfGK8FxvPdAnLnzmQJZJIxXQ66lwphz0xwTpti6vXKxNEp4tv8FS2sKgIuqQGGqQnMwpvEVaeC6eAC7dzVkKEHUv7LNwMxZgzc9LYd4iKS2whtQgio/rH82d9jhJpSiuyfNPjcgiM/Fe/jSSUTs3Ilc6xBYn5N6fX4Xejys9pQl+v26kgyOWjNeqvQ0hQkMLbDNQbIei+rZ/aGbiXPjJ4kp35aSlhBlozoPZBlqyPx6DlkXd/CDz++lboi3m6Jk1WytTN5+SbHjlQi9WVvap6cr5Pzo8CBvdwkehRrh/kN0aaT+PWX9OCspRg3IBaNJ0Ka86l/sB5WEHQ9APc8nKw3ajtdvMqFcv6Tb+/fdxvQSnEaENd3qTh8h27VBxxKfKbvA72x5zAJJ4CMNu6cUj7Jha0N9MROVmB76kELFpA94ch8g0TUu5fd6rPL4lA5vqmI";
    // const sEncData =
    //   "AgAFRzA3MjOEcB3OQf/3zOh5Obom7u36X9zPCoRGW7hhIc48LTdFVIKN7ZDIBYzr2aFmIi7tMSefBiyFGIm1rLeomNG3zlcRe+sNF3rBIuXsZSuecZ438/8cuBsvkNI7XI/+B+8LZVo4wdop8+3p/qPYp+JSEq7EjnYXd1aLBkclDiYGoQZNH+6ejtVP+hmRdMnRxHztPilKJjJvsEt81qikLUEAHPmshoCjJKqHGTTk80+6D5Zlrt4i2zuMLlIF8zrxqWHZJZvnELZNF5DMwLNgwZthuaZfGK8FxvPdAnLnzmQJZJIxXQ66lwphz0xwTpti6vXKxNEp4tv8FS2sKgIuqQGGqQnMwpvEVaeC6eAC7dzVkKEHUv7LNwMxZgzc9LYd4iKS2whtQgio/rH82d9jhJpSiuyfNPjcgiM/Fe/jSSUTs3Ilc6xBYn5N6fX4Xejys9pQl+v26kgyOWjNeqvQ0hQkMLbDNQbIei+rZ/aGbiXPjJ4kp35aSlhBlozoPZBlqyPx6DlkXd/CDz++lboi3m6Jk1WytTN5+SbHjlQi9WVvap6cr5Pzo8CBvdwkehRrh/kN0aaT+PWX9OCspRg3IBaNJ0Ka86l/sB5WEHQ9APc8nKw3ajtdvMqFcv6Tb+/fdxvQSnEaENd3qTh8h27VBxxKfKbvA72x5zAJJ4CMNu6cUj7Jha0N9MROVmB76kELFpA94ch8g0TUu5fd6rPL4lA5vqmI";
    const resData = await niceResponseService.niceResponseService(sEncData, "success");
    if (resData && resData.status && resData.status == "success" && resData.userInfo) {
      const popHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
      Retrieving Data...

      <script type="text/javascript">
      
      window.opener.postMessage(${JSON.stringify(resData.userInfo)}, '*');
      setTimeout(() => {
        window.close()
      }, 3000);
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
