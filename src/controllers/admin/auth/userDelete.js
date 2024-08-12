import { StatusError } from "../../../config/index.js";
import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * User delete
 * @param req
 * @param res
 * @param next
 */
export const userDelete = async (req, res, next) => {
  try {
    // Get the user phone number from request parameters
    const userPhone = "01059198233"; // Replace with your desired user phone number

    // Get the user ID based on their mobile number
    const userIdResult = await model.db.user.findOne({
      attributes: ["id"],
      where: {
        mobile: userPhone,
        status: "active",
      },
    });

    console.log("userIdResult:", userIdResult); // Log the userIdResult to inspect its value

    if (!userIdResult) {
      // If the user was not found, return a bad request response
      console.log("User not found.");
      throw StatusError.badRequest({ user_name: res.__("User does not exist") });
    }

    // Extract the user ID from the query result
    const userId = userIdResult.id;

    console.log("userId:", userId); // Log the extracted userId to inspect its value

    // Update the user's status in the user table to "deleted"
    const userUpdateResult = await model.db.user.update(
      { status: "deleted" },
      {
        where: {
          id: userId,
        },
      },
    );

    console.log("userUpdateResult:", userUpdateResult); // Log the userUpdateResult

    if (userUpdateResult[0] === 0) {
      // Handle the case where no records were updated; the user might not have been found
      console.log("User not updated.");
      throw StatusError.badRequest({ user_name: res.__("User not updated") });
    }

    // Update the user's status in userAdditionalInfo table
    const userAdditionalInfoUpdateResult = await model.db.userAdditionalInfo.update(
      { status: "deleted" },
      {
        where: {
          user_id: userId, // Assuming the column name is user_id
        },
      },
    );

    console.log("userAdditionalInfoUpdateResult:", userAdditionalInfoUpdateResult); // Log the update result

    // Update the user's status in userHomeAppliances table
    const userHomeAppliancesUpdateResult = await model.db.userHomeAppliances.update(
      { status: "deleted" },
      {
        where: {
          user_id: userId, // Assuming the column name is user_id
        },
      },
    );

    console.log("userHomeAppliancesUpdateResult:", userHomeAppliancesUpdateResult); // Log the update result

    if (userAdditionalInfoUpdateResult[0] === 0 && userHomeAppliancesUpdateResult[0] === 0) {
      // Handle this case as needed; it might indicate that the user was not found in those tables.
      console.log("User data not updated in additional tables.");
    }

    // Return a success response
    return res.ok({
      message: res.__("User deleted successfully"),
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    console.error(error);
    next(error);
  }
};
