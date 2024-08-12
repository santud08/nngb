import * as model from "../../../models/index.js";
import { Op } from "sequelize";
/**
 * orderChange
 * Change the priority (order) of a banner by moving it up or down in the list.
 * @param req
 * @param res
 * @param next
 */

export const orderChange = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const bannerId = reqBody.banner_id ? reqBody.banner_id : "";
    const direction = reqBody.direction ? reqBody.direction : "";
    if (direction !== "up" && direction !== "down") {
      throw new Error("Invalid direction"); // Handle invalid direction here
    }
    const bannerToMove = await model.db.banner.findOne({
      where: {
        id: bannerId, // Use the banner ID here
        status: "active",
      },
    });
    if (!bannerToMove) {
      return res.status(400).json({ message: "Invalid banner ID or banner does not exist" });
    }
    let bannerToExchangeWith;
    if (direction === "down") {
      bannerToExchangeWith = await model.db.banner.findOne({
        where: {
          priority: { [Op.lt]: bannerToMove.priority },
          status: "active",
        },
        order: [["priority", "desc"]],
      });
      console.log(bannerToExchangeWith);
      // process.exit();
      if (!bannerToExchangeWith) {
        return res.status(400).json({ message: "No more banners to move down" });
      }
    } else if (direction === "up") {
      bannerToExchangeWith = await model.db.banner.findOne({
        where: {
          priority: { [Op.gt]: bannerToMove.priority },
          status: "active",
        },
        order: [["priority", "asc"]],
      });
      if (!bannerToExchangeWith) {
        return res.status(400).json({ message: "No more banners to move up" });
      }
    }
    // Swap priorities between the two banners
    const tempPriority = bannerToMove.priority;
    bannerToMove.priority = bannerToExchangeWith.priority;
    bannerToExchangeWith.priority = tempPriority;
    await bannerToMove.save();
    await bannerToExchangeWith.save();
    res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
