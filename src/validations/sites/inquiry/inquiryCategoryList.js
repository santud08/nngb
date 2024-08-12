import { celebrate, Joi } from "celebrate";

export const inquiryCategoryList = celebrate({
  query: Joi.object({
    panel: Joi.string().valid("smart_panel", "netpoint").required(),
  }),
});
