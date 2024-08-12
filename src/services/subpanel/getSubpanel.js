import * as model from "../../models/index.js";

export const getSubpanel = async (searchParams) => {
  const conditions = { status: "active" };
  if (searchParams.status) {
    conditions.status = searchParams.status;
  }
  if (searchParams.user_id) {
    conditions.created_by = searchParams.user_id;
  }

  if (searchParams.subpanel_id) {
    conditions.id = searchParams.subpanel_id;
  }

  const result = await model.db.subpanel.findOne({
    where: conditions,
  });
  return result;
};
