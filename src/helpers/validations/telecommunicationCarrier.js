import { keyMappingHelper } from "../../helpers/index.js";
export const teleCommunicationCarrier = async (value) => {
  const listArr = await keyMappingHelper.teleCommunicationCarrier(value);
  if (!listArr) {
    return "Invalid tele communication carrier";
  } else {
    return true;
  }
};
