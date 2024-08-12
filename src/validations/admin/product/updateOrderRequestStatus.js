import { celebrate, Joi } from "celebrate";

export const updateOrderRequestStatus = celebrate({
  body: Joi.object({
    order_ids: Joi.array().required(),
    request_status: Joi.string().valid("completed", "refuse").required(),
  }),
});
