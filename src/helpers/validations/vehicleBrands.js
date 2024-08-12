import { keyMappingHelper } from "../../helpers/index.js";
export const vehicleBrands = async (value) => {
  const listArr = await keyMappingHelper.vehicleBrands(value);
  if (!listArr) {
    return "Invalid vehicle brand";
  } else {
    return true;
  }
};
