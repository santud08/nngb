import { keyMappingHelper } from "../../helpers/index.js";
export const dwellingHouseSize = async (value) => {
  const listArr = await keyMappingHelper.dwellingHouseSize(value);
  if (!listArr) {
    return "Invalid dwelling house size";
  } else {
    return true;
  }
};
