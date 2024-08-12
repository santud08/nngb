import { keyMappingHelper } from "../../helpers/index.js";
export const drinking = async (value) => {
  const listArr = await keyMappingHelper.drinking(value);
  if (!listArr) {
    return "Invalid drinking";
  } else {
    return true;
  }
};
