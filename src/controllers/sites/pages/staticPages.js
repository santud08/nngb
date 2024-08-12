import { pageService } from "../../../services/index.js";
import { envs } from "../../../config/index.js";

/**
 * checkBankId
 * @param req
 * @param res
 */
export const staticPages = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const result = await pageService.getPage(slug);
    if (!result) {
      // Handle the case where the privacy policy page is not found
      return res.status(404).json({
        error: res.__("Page not found."),
      });
    }
    res.ok({
      success: res.__("success"),
      result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
