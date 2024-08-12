import { celebrate, Joi } from "celebrate";
export const adminUserDetails = celebrate({
  query: Joi.object({
    id: Joi.number().required(),
  }),
});
