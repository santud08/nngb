import { celebrate, Joi } from "celebrate";

export const registerProductCategory = celebrate({
  body: Joi.object({
    category_name: Joi.string().required(),
    files: {
      category_img: Joi.object().allow("", null).required(),
    },
    category_desc: Joi.string().optional(),
  }),
});
