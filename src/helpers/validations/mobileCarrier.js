import { keyMappingHelper } from "../../helpers/index.js";
export const mobileCarrier = async (value) => {
  const listArr = await keyMappingHelper.mobileCarrier(value);
  if (!listArr) {
    return "Invalid mobile carrier";
  } else {
    return true;
  }
};
