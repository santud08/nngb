import * as model from "../../models/index.js";

export const saveSubpanelUserJoinedAnswer = async (insertedData) => {
  const result = await model.db.subpanelUserJoinedAnswer.create(insertedData);
  return result;
};
