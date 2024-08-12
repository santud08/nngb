import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
const { inquiryCategory } = models.db;
import { sequelize } from "../../../config/database.js";

/**
 * Get an event by ID
 * @param req
 * @param res
 */
export const viewEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    if (!eventId) throw StatusError.badRequest(res.__("idIsRequired"));

    const event = await models.db.event.findOne({
      where: {
        id: eventId,
        status: "active",
      },
      attributes: [
        [sequelize.literal("DATE_FORMAT(event.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
        "id",
        "event_code",
        "event_name",
        [sequelize.literal("DATE_FORMAT(event.event_start_date, '%Y-%m-%d %H:%i:%s')"), "event_start_date"],
        [sequelize.literal("DATE_FORMAT(event.event_end_date, '%Y-%m-%d %H:%i:%s')"), "event_end_date"],
        "event_image_url",
        "event_description",
        "points",
        "panel",
        "event_method",
      ],
      include: [],
    });
    if (!event) throw StatusError.badRequest(res.__("event on this id is not found"));

    return res.ok({
      results: event,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
