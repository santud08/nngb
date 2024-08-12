import { keyMappingHelper } from "../../helpers/index.js";
export const lastDegree = async (value) => {
  const listArr = await keyMappingHelper.lastDegree(value);
  if (!listArr) {
    return "Invalid last degree";
  } else {
    return true;
  }
};
