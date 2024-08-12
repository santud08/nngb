import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import { Op } from "sequelize";
import { generalHelper } from "../../../helpers/index.js";

export const affiliateDetails = async (req, res, next) => {
  try {
    const vendorId = req.params.vendor_id ? req.params.vendor_id : null;
    if (!vendorId) throw StatusError.badRequest(res.__("Vendor Id is required"));

    const affiliateData = await model.db.customer.findOne({
      where: {
        id: vendorId,
        status: { [Op.ne]: "deleted" },
      },
      include: [
        {
          model: model.db.business,
          where: { status: { [Op.ne]: "deleted" } },
          required: false,
          include: [
            {
              model: model.db.businessPayments,
              attributes: ["collateral_type", "transac_amount", "balance_amount"],
              where: {
                status: { [Op.ne]: "deleted" },
              },
              required: false,
            },
          ],
        },
      ],
    });
    const businessDetails =
      affiliateData &&
      affiliateData.businesses &&
      affiliateData.businesses.length > 0 &&
      affiliateData.businesses[0].dataValues
        ? affiliateData.businesses[0].dataValues
        : null;

    const firstBusinessPayment =
      affiliateData &&
      affiliateData.businesses &&
      affiliateData.businesses.length > 0 &&
      affiliateData.businesses[0].businessPayments &&
      affiliateData.businesses[0].businessPayments.length > 0
        ? affiliateData.businesses[0].businessPayments[0]
        : null;

    let collateralType = null;
    let transacAmount = null;
    let balanceAmount = null;
    let conversion_ratio = null;

    if (firstBusinessPayment) {
      if (firstBusinessPayment.collateral_type !== undefined) {
        collateralType = firstBusinessPayment.collateral_type;
      }
      if (firstBusinessPayment.transac_amount !== undefined) {
        transacAmount = firstBusinessPayment.transac_amount;
      }
      if (firstBusinessPayment.balance_amount !== undefined) {
        balanceAmount = firstBusinessPayment.balance_amount;
      }
    }
    if (businessDetails) {
      const conversion_rate_from =
        businessDetails.conversion_rate_from !== undefined
          ? businessDetails.conversion_rate_from
          : 0;
      const conversion_rate_to =
        businessDetails.conversion_rate_from !== undefined ? businessDetails.conversion_rate_to : 0;
      conversion_ratio =
        conversion_rate_from && conversion_rate_to
          ? generalHelper.calculateConversionRatio(conversion_rate_from, conversion_rate_to)
          : null;
    }

    const responseData = {
      affiliate_id: affiliateData.id ? affiliateData.id : null,
      affiliate_name: affiliateData.company_customer_name
        ? affiliateData.company_customer_name
        : null,
      company_reg_no: affiliateData.company_registration_no
        ? affiliateData.company_registration_no
        : null,
      manager: affiliateData.customer_name ? affiliateData.customer_name : null,
      conversion_rate: conversion_ratio || null,
      collateral_type: collateralType,
      reg_amount: transacAmount,
      balance: balanceAmount,
      start_date:
        businessDetails && businessDetails.service_start_date !== undefined
          ? businessDetails.service_start_date
          : null,
      end_date:
        businessDetails && businessDetails.service_end_date !== undefined
          ? businessDetails.service_end_date
          : null,
      registration_date: affiliateData.created_at ? affiliateData.created_at : null,
    };

    return res.ok(responseData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
