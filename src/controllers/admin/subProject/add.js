import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * Sub project registration
 * @param req
 * @param res
 * @param next
 */

export const addSubProject = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    let image_url = "";
    if (req.files && req.files.length > 0) {
      image_url = req.files[0] && req.files[0].location ? req.files[0].location : null;
    }
    //subproject data
    const subProjectData = {
      project_id: reqBody.project_id ? reqBody.project_id : "",
      sub_project_name: reqBody.sub_project_name ? reqBody.sub_project_name : "",
      contact_person_id: reqBody.contact_person_id ? reqBody.contact_person_id : "",
      sub_project_progress_id: reqBody.sub_project_progress_id
        ? reqBody.sub_project_progress_id
        : "",
      investigation_method_id: reqBody.investigation_method_id
        ? reqBody.investigation_method_id
        : "",
      development_difficulty: reqBody.development_difficulty ? reqBody.development_difficulty : "",
      business_id: reqBody.business_id ? reqBody.business_id : "",
      no_of_samples: reqBody.no_of_samples ? reqBody.no_of_samples : "",
      sample_unit_pice: reqBody.sample_unit_pice ? reqBody.sample_unit_pice : "",
      additional_amount: reqBody.additional_amount ? reqBody.additional_amount : "",
      discount_amount: reqBody.discount_amount ? reqBody.discount_amount : "",
      file_path: image_url || "",

      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };

    const registeredSubProject = await model.db.subProject.create(subProjectData);

    //subproject steps data
    if (registeredSubProject) {
      if (reqBody.project_schedule && reqBody.project_schedule.length > 0) {
        let schedule = [];
        for (const item of reqBody.project_schedule) {
          const scheduleData = {
            sub_project_id: registeredSubProject.id,
            sub_project_steps_id: item.sub_project_steps_id,
            start_date: item.start_date
              ? await customDateTimeHelper.changeDateFormat(item.start_date, "YYYY-MM-DD")
              : "",
            end_date: item.end_date
              ? await customDateTimeHelper.changeDateFormat(item.end_date, "YYYY-MM-DD")
              : "",
            created_at: await customDateTimeHelper.getCurrentDateTime(),
            created_by: userId,
          };
          schedule.push(scheduleData);
        }
        await model.db.subProjectStepsData.bulkCreate(schedule);
      }

      //subproject detailed settings data
      const detailedSettings = {
        sub_project_id: registeredSubProject.id,
        gender: reqBody.gender ? reqBody.gender : "",
        max_age: reqBody.max_age ? reqBody.max_age : null,
        min_age: reqBody.min_age ? reqBody.min_age : null,
        note: reqBody.note ? reqBody.note : "",
        created_at: await customDateTimeHelper.getCurrentDateTime(),
        created_by: userId,
      };

      const detailedData = await model.db.subProjectDetailedSettings.create(detailedSettings);
      //detailed settings region data which is array
      if (detailedData) {
        if (reqBody.region && reqBody.region.length > 0) {
          let data = [];
          for (const item of reqBody.region) {
            const regionData = {
              setting_id: detailedData.id,
              region_id: item,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
              created_by: userId,
            };
            data.push(regionData);
          }
          await model.db.detailedSettingsRegion.bulkCreate(data);
        }
      }
      //hashtags data
      if (registeredSubProject) {
        if (reqBody.hashtag && reqBody.hashtag.length > 0) {
          let records = [];
          for (const items of reqBody.hashtag) {
            const hashtagData = {
              sub_project_id: registeredSubProject.id,
              hashtag: items,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
              created_by: userId,
            };
            records.push(hashtagData);
          }
          await model.db.subProjectHashtags.bulkCreate(records);
        }
      }
      return res.ok({
        message: res.__("Registered successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
