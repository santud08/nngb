import { celebrate, Joi } from "celebrate";

export const conversionRestrictionDetails = celebrate({
  query: Joi.object({
    business_id: Joi.number().required(),
  }),
});
