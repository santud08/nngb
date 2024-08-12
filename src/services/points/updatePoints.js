import * as model from "../../models/index.js";
const { bonousPoints, cashHistory, user, event } = model.db;
import { Sequelize } from "sequelize";
import { StatusError } from "../../config/index.js";
import { customDateTimeHelper } from "../../helpers/index.js";
import { envs } from "../../config/index.js";
/**
 * Get points based on the reason
 * @param reason The reason for getting points
 * @returns The points corresponding to the reason
 */
const getPointsByReason = async (
  reason,
  registrationBonous = null,
  referralBonous = null,
  eventId = null,
) => {
  let points = {};
  let joinReferalBonousDetails, joinReferrerBonousDetails, normalJoinDetails, eventRecord;

  switch (reason) {
    case "signedUp":
      normalJoinDetails = await bonousPoints.findOne({
        where: { btype: registrationBonous, status: "active" },
        raw: true,
      });
      joinReferalBonousDetails = await bonousPoints.findOne({
        where: {
          btype: referralBonous,
          status: "active",
        },
        order: [["id", "DESC"]],
        limit: 1,
        raw: true,
      });

      joinReferrerBonousDetails = await bonousPoints.findOne({
        where: {
          btype: referralBonous,
          status: "active",
        },
        order: [["id", "ASC"]],
        limit: 1,
        raw: true,
      });
      if (normalJoinDetails) {
        points = {
          ...normalJoinDetails,
          points: parseInt(normalJoinDetails.earn_cash),
        };
      }
      if (joinReferalBonousDetails && joinReferrerBonousDetails) {
        joinReferalBonousDetails = {
          ...joinReferalBonousDetails,
          points: parseInt(joinReferalBonousDetails.earn_cash),
        };
        joinReferrerBonousDetails = {
          ...joinReferrerBonousDetails,
          points: parseInt(joinReferrerBonousDetails.earn_cash),
        };
      }
      break;

    case "involvedInEvent":
      eventRecord = await event.findOne({
        where: { id: eventId },
        attributes: ["eventRewards"],
        raw: true,
      });
      if (eventRecord) {
        points = {
          ...eventRecord,
          points: parseInt(eventRecord.eventRewards),
        };
      }
      break;
    case "other":
      points = 0; //  default points (after confirmed add appropriate logic)
      break;

    default:
      throw StatusError.badRequest("Invalid reason");
  }

  return {
    points: points,
    pointsByReference: joinReferalBonousDetails,
    referrerPoints: joinReferrerBonousDetails,
  };
};

/**
 * Update joining bonus and event points for a user
 * @param userDetails
 * @param referrerId
 * @param reason
 * @param eventId
 */
export const updatePoints = async (userDetails, referrerId = null, reason, eventId = null) => {
  try {
    const { id, email } = userDetails;
    const userRecord = await user.findOne({
      where: {
        [Sequelize.Op.or]: [{ id: id ? id : null }, { email: email ? email : null }],
      },
      attributes: ["id"],
      raw: true,
    });
    // check for user exists
    if (!userRecord) throw StatusError.badRequest("userNotExists");
    const userId = userRecord.id;
    const registrationBonous = envs.BIZ_TYPE.REGISTRATION_BIZ_TYPE || null;
    const referralBonous = referrerId ? envs.BIZ_TYPE.REFERAL_BONUS_BIZ_TYPE : null;

    // get points according to events done
    const points = await getPointsByReason(reason, registrationBonous, referralBonous, eventId);
    const toDayDate = await customDateTimeHelper.getCurrentDateTime();
    let totalCash = await cashHistory.sum("cash", {
      where: { ucode: id },
    });
    if (referrerId) {
      // Only for joining by reference
      const referrerUserId = await user.findOne({
        where: { referral_id: referrerId },
        attributes: ["id"],
        raw: true,
      });

      if (!referrerUserId) {
        throw StatusError.badRequest("userNotExists");
      }
      const ReferalTotalCash = await cashHistory.sum("cash", {
        where: { ucode: referrerUserId.id },
      });
      // create histroy for referral joining
      const cashHistoryData = [
        {
          ucode: userId,
          btype: points.points.btype,
          cash: points.points.points,
          title: points.points.title,
          vendor_id: points.points.vendor_id,
          business_id: points.points.id,
          total_cash: points.points.points,
          check_cash: points.points.points,
          reg_day: toDayDate,
        },
        {
          ucode: userId,
          btype: points.pointsByReference.btype,
          cash: points.pointsByReference.points,
          title: points.pointsByReference.title,
          vendor_id: points.pointsByReference.vendor_id,
          business_id: points.pointsByReference.id,
          total_cash: parseInt(points.pointsByReference.points) + parseInt(points.points.points),
          check_cash: points.pointsByReference.points,
          reg_day: toDayDate,
        },
        {
          ucode: referrerUserId.id,
          btype: points.referrerPoints.btype,
          cash: points.referrerPoints.points,
          title: points.referrerPoints.title,
          vendor_id: points.referrerPoints.vendor_id,
          business_id: points.referrerPoints.id,
          total_cash: parseInt(points.referrerPoints.points) + parseInt(ReferalTotalCash || 0),
          check_cash: points.referrerPoints.points,
          reg_day: toDayDate,
        },
      ];
      await cashHistory.bulkCreate(cashHistoryData);
    } else {
      const cashHistoryData = {
        ucode: userId,
        btype: points.points.btype,
        cash: points.points.points,
        title: points.points.title,
        vendor_id: points.points.vendor_id,
        business_id: points.points.id,
        total_cash: parseInt(points.points.points) + parseInt(totalCash || 0),
        check_cash: points.points.points,
        reg_day: toDayDate,
      };
      await cashHistory.create(cashHistoryData);
    }
  } catch (error) {
    console.log(error);
  }
};
