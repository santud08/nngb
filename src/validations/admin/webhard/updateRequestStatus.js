import { celebrate, Joi } from "celebrate";

export const updateRequestStatus = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    status: Joi.string().required(),
  }),
});
