import { celebrate, Joi } from "celebrate";

export const vendorList = celebrate({
  query: Joi.object({
    search_text: Joi.string().required(),
  }),
});
