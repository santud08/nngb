import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";

/**
 * viewBanner
 * Retrieve details of a specific banner by its ID.
 * Users can view information about a banner, including its name, exposure dates, image paths, links, acquisition channel, priority, and status.
 * @param req
 * @param res
 * @param next
 */
export const viewBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.id ? req.params.id : null;
    if (!bannerId) throw StatusError.badRequest(res.__("invalidId"));

    let banner = await models.db.banner.findOne({
      where: {
        id: bannerId,
        status: "active",
      },
      attributes: [
        "id",
        "banner_name",
        "exposure_period_start_date",
        "exposure_period_end_date",
        "banner_image_pc_original_filename",
        "banner_image_pc_filename",
        "banner_image_pc_path",
        "banner_image_mobile_original_filename",
        "banner_image_mobile_filename",
        "banner_image_mobile_path",
        "link_url",
        "link_target",
        "acquisition_channel",
        "priority",
        "status",
        [
          Sequelize.fn(
            "IFNULL",
            Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s')"),
            "",
          ),
          "created_at",
        ],
      ],
    });

    if (!banner) {
      throw StatusError.badRequest(res.__("banner id does not exist"));
    }

    return res.ok({
      results: banner,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
