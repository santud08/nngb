import { businessService } from "../../../services/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
/**
 * Generate a business encryption key
 * @param req
 * @param res
 * @param next
 */
export const generateBusinessEncryptionKey = (req, res, next) => {
  try {
    const format = req.body.format;

    // Check if the format is not provided or is invalid
    if (!format || !/^(aes128|seed128)$/i.test(format)) {
      throw StatusError.badRequest(
        res.__("Invalid or missing encryption format (use aes128 or seed128)"),
      );
    }

    const input = req.body.input;
    const encryptionKey = businessService.generateBusinessEncryptionKey(format, input);
    return res.json({ encryptionKey });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
