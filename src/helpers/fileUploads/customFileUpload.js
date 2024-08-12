import { StatusError } from "../../config/index.js";
function customFileUpload(multerUploadFunction) {
  return (req, res, next) =>
    multerUploadFunction(req, res, (err) => {
      // handle Multer error
      if (err && err.name && err.name === "MulterError") {
        return next(StatusError.badRequest("MulterError"));
      }
      if (err && err.code && err.code === "LIMIT_FILE_TYPE") {
        return next(StatusError.badRequest(res.__(err.msg)));
      }
      // handle other errors
      if (err) {
        return next(StatusError.badRequest("fileUploadError"));
      }
      next();
    });
}
export { customFileUpload };
