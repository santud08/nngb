import { celebrate, Joi } from "celebrate";

export const getAllWriteLimitBusinessSearch = celebrate({
  query: Joi.object({
    business_name_search: Joi.string().required().allow(""),
  }),
});
