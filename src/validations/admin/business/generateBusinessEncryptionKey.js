import { celebrate, Joi } from "celebrate";

export const generateBusinessEncryptionKey = celebrate({
  body: Joi.object({
    format: Joi.string().valid("aes128", "seed128").required(),
  }),
});
