import { celebrate, Joi } from "celebrate";

export const viewInquiry = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
