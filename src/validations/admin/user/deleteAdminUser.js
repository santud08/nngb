import { celebrate, Joi } from "celebrate";
export const deleteAdminUser = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
  }),
});
