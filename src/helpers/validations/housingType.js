import { keyMappingHelper } from "../../helpers/index.js";
export const housingType = async (value) => {
  const listArr = await keyMappingHelper.housingType(value);
  if (!listArr) {
    return "Invalid housing type";
  } else {
    return true;
  }
};
