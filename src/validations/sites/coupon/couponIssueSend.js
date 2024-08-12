import { celebrate, Joi } from "celebrate";

export const couponIssueSend = celebrate({
  body: Joi.object({
    endPoint: Joi.string().required(),
    req_div_cd: Joi.string().required(),
    issu_req_val: Joi.string().required(),
    clico_issu_paym_no: Joi.string().required(),
    clico_issu_paym_seq: Joi.string().required(),
    cre_cnt: Joi.string().required(),
    rcvr_telno: Joi.string().required(),
    sndr_telno: Joi.string().required(),
    title: Joi.string().required(),
    body_top_add_msg: Joi.string().required(),
    avl_div_cd: Joi.string().required(),
    avl_start_dy: Joi.string(),
    avl_end_dy: Joi.string(),
    crd_join_yn: Joi.string(),
    cmpn_cd: Joi.string(),
    msg_typ: Joi.string(),
    send_req_dt: Joi.string(),
    cust_no: Joi.string(),
    usable_mcht_cd: Joi.string(),
  }),
});
