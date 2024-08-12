import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * deleteBanner
 * Delete a banner by updating its status to "deleted."
 * @param req
 * @param res
 * @param next
 */
export const deleteBanner = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;
    const bannerIdToDelete = req.body.id; // Specify the banner ID to delete

    // Find the banner to delete based on its ID
    let bannerToDelete = await model.db.banner.findOne({
      where: {
        id: bannerIdToDelete,
        status: "active",
      },
    });

    if (!bannerToDelete) {
      throw StatusError.badRequest(res.__("Banner does not exist"));
    }

    // Update the banner's status to "deleted" using bannerToDelete.update
    const updatedBanner = await bannerToDelete.update({
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    });
    const bannerClickCountToDelete = await model.db.bannerClickCount.findOne({
      where: {
        banner_id: bannerIdToDelete,
        status: "active",
      },
    });

    if (bannerClickCountToDelete) {
      await bannerClickCountToDelete.update({
        status: "deleted",
        updated_by: userId,
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
      });
    }

    if (updatedBanner) {
      return res.ok({ message: res.__("Banner has been deleted") });
    } else {
      throw StatusError.serverError(res.__("Server error while deleting the banner"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
