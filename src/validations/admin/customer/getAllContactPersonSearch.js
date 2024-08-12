import { celebrate, Joi } from "celebrate";

export const getAllContactPersonSearch = celebrate({
  query: Joi.object({
    type: Joi.string().valid("interior", "outside").required(),
    search_text: Joi.string().required().allow(""),
  }),
});
