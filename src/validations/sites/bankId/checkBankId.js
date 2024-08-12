import { celebrate, Joi } from "celebrate";

export const checkBankId = celebrate({
  body: Joi.object({
    strBankCode: Joi.string().required(),
    strAccountNo: Joi.string().required(),
    name: Joi.string().required(),
  }),
});
