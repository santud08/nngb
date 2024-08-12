import { keyMappingHelper } from "../../helpers/index.js";
export const vehicleType = async (value) => {
  const listArr = await keyMappingHelper.vehicleType(value);
  if (!listArr) {
    return "Invalid vehicle type";
  } else {
    return true;
  }
};
