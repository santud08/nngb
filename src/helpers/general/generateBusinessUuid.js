import { businessService } from "../../services/index.js";

export const generateBusinessUuid = async (stringLen = 6, padString = "0") => {
  let businessCode = "";
  let lastId = 0;
  const getLastId = await businessService.getLastBusinessId();

  if (typeof getLastId !== "undefined" && getLastId !== null) {
    lastId = parseInt(getLastId);
  }
  const newId = Math.floor(lastId + 1 + 10000 + Math.random() * 99999);
  businessCode = newId.toString().padStart(stringLen, padString);
  return businessCode;
};
