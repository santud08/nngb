import { keyMappingHelper } from "../../helpers/index.js";
export const furniture = async (value) => {
  const listArr = await keyMappingHelper.furniture(value);
  if (!listArr) {
    return "Invalid furniture";
  } else {
    return true;
  }
};
