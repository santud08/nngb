import * as model from "../../models/index.js";

export const calculateTotalCashForUser = async (vendorId, ucode) => {
  const totalCash = await model.db.ncashExchange.sum("cash", {
    where: {
      vendor_id: vendorId,
      ucode: ucode,
      request_status: "completed",
    },
  });
  return totalCash.toString(); // Convert to string as per your requirement
};
