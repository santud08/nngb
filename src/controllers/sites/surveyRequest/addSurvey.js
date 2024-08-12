import { StatusError } from "../../../config/StatusErrors.js";
import * as model from "../../../models/index.js";
import { keyMappingHelper, customDateTimeHelper } from "../../../helpers/index.js";

/**
 * Add survey request
 * @param req
 * @param res
 */

export const addSurvey = async (req, res, next) => {
  try {
    const reqBody = req.body;
    let surveyMethods = "";
    if (reqBody.survey_method && reqBody.survey_method.length > 0) {
      const listedMethods = await keyMappingHelper.surveyMethods();
      for (const eachSm of reqBody.survey_method) {
        if (eachSm) {
          if (!Object.keys(listedMethods).includes(eachSm)) {
            throw StatusError.badRequest(res.__("Invalid survey method"));
          }
        }
      }
      surveyMethods = reqBody.survey_method.toString();
    }

    const startDate = reqBody.investigation_start_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.investigation_start_date, "YYYY-MM-DD")
      : "";
    const endDate = reqBody.investigation_end_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.investigation_end_date, "YYYY-MM-DD")
      : "";
    const userId = req.userDetails.userId ? req.userDetails.userId : null;
    const surveyData = {
      survey_methods: surveyMethods,
      name: reqBody.name ? reqBody.name : "",
      email: reqBody.email ? reqBody.email : "",
      phone: reqBody.phone ? reqBody.phone : "",
      company_name: reqBody.company_name ? reqBody.company_name : "",
      department: reqBody.department ? reqBody.department : "",
      survey_condition: reqBody.survey_condition ? reqBody.survey_condition : "",
      investigation_start_date: startDate,
      investigation_end_date: endDate,
      survey_target: reqBody.survey_target ? reqBody.survey_target : "",
      survey_content: reqBody.survey_content ? reqBody.survey_content : "",
      acquisition_channel: reqBody.panel ? reqBody.panel : null,
      status: "active",
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    const createdSurvey = await model.db.surveyRequest.create(surveyData);
    if (createdSurvey) {
      if (req.files.length > 0) {
        let filesData = [];
        for (const imageDetails of req.files) {
          const element = {
            survey_request_id: createdSurvey.id,
            originalname: imageDetails.originalname ? imageDetails.originalname : "",
            filename: imageDetails.key ? imageDetails.key : "", // for s3 bucket use
            path: imageDetails.bucket ? imageDetails.bucket : "",
            size: imageDetails.size ? imageDetails.size : "",
            mime_type: imageDetails.mimetype ? imageDetails.mimetype : "",
            location: imageDetails.location ? imageDetails.location : "",
            status: "active",
            created_by: userId,
            created_at: await customDateTimeHelper.getCurrentDateTime(),
          };
          filesData.push(element);
        }
        //console.log("filesData", filesData);
        if (filesData.length > 0) await model.db.surveyRequestFiles.bulkCreate(filesData);
      }
      return res.ok({
        message: res.__("createdSuccessfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
