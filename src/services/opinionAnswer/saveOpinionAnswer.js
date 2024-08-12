import * as model from "../../models/index.js";

export const saveOpinionAnswer = async (insertedData) => {
  const result = await model.db.opinionAnswer.create(insertedData);
  return result;
};
