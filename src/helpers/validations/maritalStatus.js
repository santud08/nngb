import { keyMappingHelper } from "../../helpers/index.js";
export const maritalStatus = async (value) => {
  const listArr = await keyMappingHelper.maritalStatus(value);
  if (!listArr) {
    return "Invalid marital status";
  } else {
    return true;
  }
};
