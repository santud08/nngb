import { keyMappingHelper } from "../../helpers/index.js";
export const cellPhoneManufacturer = async (value) => {
  const listArr = await keyMappingHelper.cellPhoneManufacturer(value);
  if (!listArr) {
    return "Invalid cell Phone Manufacturer";
  } else {
    return true;
  }
};
