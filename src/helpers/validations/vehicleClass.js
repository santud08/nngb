import { keyMappingHelper } from "../../helpers/index.js";
export const vehicleClass = async (value) => {
  const listArr = await keyMappingHelper.vehicleClass(value);
  if (!listArr) {
    return "Invalid vehicle class";
  } else {
    return true;
  }
};
