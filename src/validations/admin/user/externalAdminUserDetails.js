import { celebrate, Joi } from "celebrate";
export const externalAdminUserDetails = celebrate({
  query: Joi.object({
    id: Joi.number().required(),
  }),
});
