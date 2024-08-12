import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import * as models from "../../../models/index.js";

/**
 *
 * Delete a industry by updating its status to "deleted."
 * @param req
 * @param res
 * @param next
 */
export const deleteIndustry = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;
    const industryIdToDelete = req.body.id;

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    let industryToDelete = await model.db.industry.findOne({
      where: {
        id: industryIdToDelete,
        status: "active",
      },
    });

    let industryParentToDelete = await model.db.industry.findAll({
      attributes: ["id"],
      where: {
        parent: industryIdToDelete,
        status: "active",
      },
    });
    const parentIdArray =
      industryParentToDelete && industryParentToDelete.length > 0
        ? industryParentToDelete.map((item) => item.id)
        : [];
    let arrayLength = parentIdArray.length;

    if (arrayLength > 0) {
      throw StatusError.badRequest(res.__("Please delete assigned step_2 "));
    } else {
      if (industryToDelete) {
        await Promise.all([
          parentIdArray.length > 0
            ? models.db.industry.update(data, {
                where: { id: { [Op.in]: parentIdArray } },
              })
            : "",
          models.db.industry.update(data, { where: { id: industryIdToDelete } }),
        ]);
        return res.ok({
          message: res.__("Deleted successfully"),
        });
      } else {
        throw StatusError.badRequest(res.__("SomeThingWentWrong"));
      }
    }
  } catch (error) {
    next(error);
  }
};
