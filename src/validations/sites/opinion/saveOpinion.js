import { celebrate, Joi } from "celebrate";

export const saveOpinion = celebrate({
  body: Joi.object({
    opinion_id: Joi.number().required(),
    opinion_item_id: Joi.number().allow("").allow(null).optional(),
    comment: Joi.string().allow("").allow(null).optional(),
  }),
});
