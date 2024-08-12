import * as model from "../../models/index.js";

export const getPage = async (slug) => {
  const result = await model.db.pages.findOne({
    where: { slug: slug },
    attributes: ['title', 'body', 'meta', 'type', 'published_at'],
    raw: true,
  });
  return result;
};

