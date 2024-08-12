import { celebrate, Joi } from "celebrate";

export const affiliateDetails = celebrate({
  params: Joi.object({
    vendor_id: Joi.number().required(),
  }),
});
