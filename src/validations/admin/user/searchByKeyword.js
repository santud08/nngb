import { celebrate, Joi } from "celebrate";

export const searchByKeyword = celebrate({
  body: Joi.object({
    type: Joi.string().valid("company", "bu", "headquarter", "team", "rank").required(),
    search_text: Joi.string().required().allow(""),
  }),
});
