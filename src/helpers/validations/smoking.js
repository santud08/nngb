import { keyMappingHelper } from "../../helpers/index.js";
export const smoking = async (value) => {
  const listArr = await keyMappingHelper.smoking(value);
  if (!listArr) {
    return "Invalid smoking";
  } else {
    return true;
  }
};
