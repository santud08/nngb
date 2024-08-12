import * as model from "../../models/index.js";
import { Sequelize } from "sequelize";

export const getUserDetailsForSpecificVendor = async (vendorId) => {
  const ucodeValues = await model.db.ncashExchange.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("ucode")), "ucode"]],
    where: {
      vendor_id: vendorId,
      status: "active",
    },
    raw: true,
  });

  const customerData = await model.db.customer.findOne({
    attributes: [["company_customer_name", "company_name"]],
    where: { id: vendorId },
  });

  const ucodeList = ucodeValues.map((entry) => entry.ucode);

  const userPromises = ucodeList.map(async (ucode) => {
    const userData = await model.db.user.findOne({
      attributes: ["name", "email", "mobile"],
      where: { id: ucode },
    });

    const userList = {
      name: userData.name,
      email: userData.email,
      phone_number: userData.mobile,
      mobile_number: "", // need to update after confirmation
      company_name: (customerData && customerData.dataValues?.company_name) || null,
      weather_or_not_to_use: userData.status,
    };
    return userList;
  });

  const userList = await Promise.all(userPromises);
  return userList;
};
