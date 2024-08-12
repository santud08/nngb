import * as model from "../../models/index.js";

export const saveSubpanelUserJoined = async (insertedData) => {
  const result = await model.db.subpanelUserJoined.create(insertedData);
  return result;
};
