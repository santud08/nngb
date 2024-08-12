import { keyMappingHelper } from "../../helpers/index.js";
export const houseWife = async (value) => {
  const listArr = await keyMappingHelper.houseWife(value);
  if (!listArr) {
    return "Invalid house wife";
  } else {
    return true;
  }
};
