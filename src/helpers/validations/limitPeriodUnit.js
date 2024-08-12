import { keyMappingHelper } from "../../helpers/index.js";
export const limitPeriodUnit = async (value) => {
  const listArr = await keyMappingHelper.limitPeriodUnit(value);
  if (!listArr) {
    return "Invalid unit";
  } else {
    return true;
  }
};
