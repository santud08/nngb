/**
 * View Html Ncash
 * @param req
 * @param res
 * @param next
 */

export const viewHtmlNcash = async (req, res, next) => {
  try {
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
        <iframe src="http://ex.netpoint.co.kr/cbiz/ExAPIServer/test/v11/clientTest.jsp"></iframe>        
        </body>
        </html>
        `;
    res.ok(popHtml);
  } catch (error) {
    next(error);
  }
};
