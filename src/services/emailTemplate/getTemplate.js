import * as model from "../../models/index.js";

const { emailTemplate } = model.db;

export const getTemplate = async (type, language) => {
  const result = await emailTemplate.findOne({
    where: { template_key: type, language: language, status: "active" },
    raw: true,
  });
  return result;
};
