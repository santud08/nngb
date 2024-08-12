import * as model from "../../models/index.js";

export const updateSubpanelUserJoined = async (updatededData, whereData) => {
  const result = await model.db.subpanelUserJoined.update(updatededData, {
    where: whereData,
  });
  return result;
};
