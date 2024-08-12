import { keyMappingHelper } from "../../helpers/index.js";
export const vehiclePossession = async (value) => {
  const listArr = await keyMappingHelper.vehiclePossession(value);
  if (!listArr) {
    return "Invalid vehicle possession";
  } else {
    return true;
  }
};
