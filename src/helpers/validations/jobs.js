import { keyMappingHelper } from "../../helpers/index.js";
export const jobs = async (value) => {
  const listArr = await keyMappingHelper.jobs(value);
  if (!listArr) {
    return "Invalid jobs";
  } else {
    return true;
  }
};
