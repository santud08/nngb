import { keyMappingHelper } from "../../helpers/index.js";
export const homeOwnership = async (value) => {
  const listArr = await keyMappingHelper.homeOwnership(value);
  if (!listArr) {
    return "Invalid home ownership";
  } else {
    return true;
  }
};
