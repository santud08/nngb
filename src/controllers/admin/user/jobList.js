import { keyMappingHelper } from "../../../helpers/index.js";

/**
 * Job List
 * @param req
 * @param res
 */
export const jobList = async (req, res, next) => {
  try {
    const jobs = await keyMappingHelper.jobs();
    const jobLists = Object.keys(jobs).map((jobKey) => ({
      job_key: jobKey,
      job_name: jobs[jobKey],
    }));

    res.ok({
      results: jobLists,
    });
  } catch (error) {
    next(error);
  }
};
