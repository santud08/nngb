import { celebrate, Joi } from "celebrate";

export const subpanelWithdrawal = celebrate({
  body: Joi.object({
    subpanel_id: Joi.number().required(),
  }),
});
