import { celebrate, Joi } from "celebrate";

export const productUpdate = celebrate({
  body: Joi.object({
    product_id: Joi.number().required(),
    brand_name: Joi.string().required(),
    product_name: Joi.string().required(),
    // product_image: Joi.string(),
    files: {
      img_url: Joi.object().allow("", null).required(),
    },
    status: Joi.string().valid("active", "inactive", "deleted").required(),
    price: Joi.string().required(),
    exp_start_date: Joi.string().required(),
    exp_end_date: Joi.string().required(),
    product_code: Joi.string().required(),
    product_detail: Joi.string().required(),
  }),
});
