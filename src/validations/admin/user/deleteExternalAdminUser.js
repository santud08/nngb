import { celebrate, Joi } from "celebrate";
export const deleteExternalAdminUser = celebrate({
  query: Joi.object({
    id: Joi.number().required(),
  }),
});
