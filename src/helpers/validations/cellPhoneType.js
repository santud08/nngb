import { keyMappingHelper } from "../../helpers/index.js";
export const cellPhoneType = async (value) => {
  const listArr = await keyMappingHelper.cellPhoneType(value);
  if (!listArr) {
    return "Invalid cell phone type.";
  } else {
    return true;
  }
};
