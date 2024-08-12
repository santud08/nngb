import * as model from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { STATISTICS_SETTINGS } from "../../../utils/constants.js";

/**
 * member Statistics
 * @param req
 * @param res
 */
export const memberStatistics = async (req, res, next) => {
  try {
    const minAge = STATISTICS_SETTINGS.MIN_AGE;
    const maxAge = STATISTICS_SETTINGS.MAX_AGE;
    const currentDate = req.query.date
      ? customDateTimeHelper.formatDateToIsoString(req.query.date, "YYYY-MM-DD")
      : await customDateTimeHelper.getCurrentDateTime("YYYY-MM-DD");
    let totalMaleCount = 0,
      totalFemaleCount = 0,
      totalCount = 0;
    const ageQuery = Sequelize.where(Sequelize.fn("calculateAge", col("dob"), `${currentDate}`), {
      [Op.between]: [minAge, maxAge],
    });

    const allRegions = await model.db.regions.findAll({
      attributes: ["id", "region_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });
    const regionStatistics = [];

    for (const region of allRegions) {
      const regionName = region.region_name;

      const maleCount = await model.db.user.count({
        attributes: [
          [Sequelize.literal(`'${regionName}'`), "region_name"],
          [
            Sequelize.literal(`
              SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END)
            `),
            "male_count",
          ],
        ],
        where: {
          address: {
            [Op.like]: `%${regionName}%`,
          },
          status: {
            [Op.ne]: "delete",
          },
          dob: { [Op.ne]: null },
          gender: "male",
          [Op.and]: ageQuery,
        },
      });

      const femaleCount = await model.db.user.count({
        attributes: [
          [Sequelize.literal(`'${regionName}'`), "region_name"],
          [
            Sequelize.literal(`
              SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END)
            `),
            "female_count",
          ],
        ],
        where: {
          address: {
            [Op.like]: `%${regionName}%`,
          },
          status: {
            [Op.ne]: "delete",
          },
          dob: { [Op.ne]: null },
          gender: "female",
          [Op.and]: ageQuery,
        },
      });

      const totalMemberCount = maleCount + femaleCount;

      regionStatistics.push({
        region_name: regionName,
        male_count: maleCount,
        female_count: femaleCount,
        total_count: totalMemberCount,
      });

      totalMaleCount += maleCount;
      totalFemaleCount += femaleCount;
      totalCount += totalMemberCount;
    }

    return res.ok({
      total_male_count: totalMaleCount,
      total_female_count: totalFemaleCount,
      total_count: totalCount,
      results: regionStatistics,
    });
  } catch (error) {
    next(error);
  }
};
