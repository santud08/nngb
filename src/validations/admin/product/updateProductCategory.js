import { celebrate, Joi } from "celebrate";

export const updateProductCategory = celebrate({
  body: Joi.object({
    category_id: Joi.number().required(),
    category_name: Joi.string().required(),
    files: {
      category_img: Joi.object().allow("", null).required(),
    },
    category_desc: Joi.string().optional(),
  }),
});
