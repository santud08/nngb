import { keyMappingHelper } from "../../helpers/index.js";
export const householdIncome = async (value) => {
  const listArr = await keyMappingHelper.householdIncome(value);
  if (!listArr) {
    return "Invalid household Income";
  } else {
    return true;
  }
};
