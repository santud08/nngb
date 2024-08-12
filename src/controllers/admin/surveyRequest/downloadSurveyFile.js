import { StatusError } from "../../../config/StatusErrors.js";
import { generalHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * downloadSurveyFile
 * @param req
 * @param res
 */
export const downloadSurveyFile = async (req, res, next) => {
  try {
    const surveyFileId = req.body.file_id;
    const surveyId = req.body.survey_id;

    if (!surveyId) throw StatusError.badRequest(res.__("invalidId"));

    const survey = await models.db.surveyRequestFiles.findOne({
      where: {
        id: surveyFileId,
        survey_request_id: surveyId,
        status: { [Op.ne]: "deleted" },
      },
      attributes: ["filename", "location"],
      include: [
        {
          model: models.db.surveyRequest,
          required: true,
          left: true,
          attributes: [],
          where: {
            status: "active",
          },
        },
      ],
    });
    if (!survey) {
      throw StatusError.badRequest(res.__("survey id does not exist"));
    }
    let fileData = { path: "" };
    if (survey && survey.location) {
      const fileName = survey.filename;
      const destinationPath = `public/download_file/${Date.now()}_${fileName}`;
      await generalHelper.downloadFileFromUrl(destinationPath, survey.location);
      fileData.path = Buffer.from(`${destinationPath}`).toString("hex");
    }
    return res.ok(fileData);
  } catch (error) {
    next(error);
  }
};
