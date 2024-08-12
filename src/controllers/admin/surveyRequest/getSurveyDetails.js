import { Sequelize, Op } from "sequelize";
import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";

/**
 * viewSurvey
 * @param req
 * @param res
 */
export const viewSurvey = async (req, res, next) => {
  try {
    const surveyId = req.params.id;

    if (!surveyId) throw StatusError.badRequest(res.__("invalidId"));

    let survey = await models.db.surveyRequest.findOne({
      where: {
        id: surveyId,
        status: { [Op.ne]: "deleted" },
      },
      attributes: [
        "id",
        "survey_methods",
        ["name", "inquirer_name"],
        ["phone", "contact"],
        "email",
        "company_name",
        "department",
        ["survey_condition", "subject_conditions"],
        [
          Sequelize.fn(
            "DATE_FORMAT",
            Sequelize.col("investigation_start_date"),
            "%Y-%m-%d %H:%i:%s",
          ),
          "investigation_start_date",
        ],
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("investigation_end_date"), "%Y-%m-%d %H:%i:%s"),
          "investigation_end_date",
        ],
        "survey_target",
        "survey_content",
      ],
      include: [
        {
          model: models.db.surveyRequestFiles,
          as: "surveyFiles",
          required: false,
          left: true,
          attributes: [
            ["id", "file_id"],
            ["originalname", "file_name"],
          ],
          where: {
            status: "active",
          },
        },
      ],
    });
    if (!survey) {
      throw StatusError.badRequest(res.__("survey id does not exist"));
    }
    if (survey.dataValues.surveyFiles) {
      survey.dataValues.survey_files = survey.dataValues.surveyFiles;
      delete survey.dataValues.surveyFiles;
    } else {
      survey.survey_files = [];
    }

    return res.ok(survey);
  } catch (error) {
    next(error);
  }
};
