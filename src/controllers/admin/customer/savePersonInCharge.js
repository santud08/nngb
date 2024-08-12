import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper, generalHelper } from "../../../helpers/index.js";
import { contactPersonService } from "../../../services/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * savePersonInCharge
 * save person-in-charge
 * @param req
 * @param res
 * @param next
 */
export const savePersonInCharge = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    if (reqBody.contact_person_id == "" && reqBody.email) {
      const isEmailExist = await model.db.contactPersons.findOne({
        where: {
          email: reqBody.email,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isEmailExist) {
        throw StatusError.badRequest(res.__("This email is already registered"));
      }
    }

    if (reqBody.contact_person_id == "" && reqBody.contact_no) {
      const isMobileExist = await model.db.contactPersons.findOne({
        where: {
          contact_no: reqBody.contact_no,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isMobileExist) {
        throw StatusError.badRequest(res.__("This mobile is already registered"));
      }
    }

    // prepare data for insertion
    if (reqBody.contact_person_id && reqBody.contact_person_id > 0) {
      //Check whether valid contact_person_id is given
      if (reqBody.person_type == "interior") {
        const isManagerExist = await model.db.adminUsers.findOne({
          where: {
            id: reqBody.contact_person_id,
            user_type: "manager",
            status: { [Op.ne]: "deleted" },
            vendor_id: null,
            business_ids: null,
          },
        });
        if (!isManagerExist) {
          throw StatusError.badRequest(res.__("invalidId"));
        }

        //Check for already exist
        const isCustContactPersonExist = await model.db.customerContactPersons.findOne({
          where: {
            customer_id: reqBody.customer_id,
            contact_person_id: reqBody.contact_person_id,
            person_type: "interior",
            status: { [Op.ne]: "deleted" },
          },
        });
        if (isCustContactPersonExist) {
          throw StatusError.badRequest(res.__("Customer with same contact person already exist"));
        }
      } else {
        const isContactPersonExist = await model.db.contactPersons.findOne({
          where: {
            id: reqBody.contact_person_id,
            status: { [Op.ne]: "deleted" },
          },
        });
        if (!isContactPersonExist) {
          throw StatusError.badRequest(res.__("invalidId"));
        }

        //Check for already exist
        const isCustContactPersonExist = await model.db.customerContactPersons.findOne({
          where: {
            customer_id: reqBody.customer_id,
            contact_person_id: reqBody.contact_person_id,
            person_type: "outside",
            status: { [Op.ne]: "deleted" },
          },
        });
        if (isCustContactPersonExist) {
          throw StatusError.badRequest(res.__("Customer with same contact person already exist"));
        }
      }

      //Insert customer contact person
      const dataCustomerContactPerson = {
        customer_id: reqBody.customer_id,
        person_type: reqBody.person_type,
        contact_person_id: reqBody.contact_person_id,
        note: reqBody.note ? reqBody.note : null,
        status: "active",
        created_by: userId,
        created_at: await customDateTimeHelper.getCurrentDateTime(),
      };
      await model.db.customerContactPersons.create(dataCustomerContactPerson);
    } else {
      //Get max ID
      const resultMaxId = await contactPersonService.getContactPersonMaxId();
      let maxId = 1;
      if (resultMaxId) {
        maxId = resultMaxId.maxId + 1;
      }

      //H-Code generation
      const hcode = generalHelper.generateHCode(maxId);

      //Insert contact person
      const data = {
        hcode: hcode,
        name: reqBody.person_name,
        email: reqBody.email,
        contact_no: reqBody.contact_no,
        rank: reqBody.rank,
        bu_id: reqBody.bu_id,
        team_id: reqBody.team_id,
        headquarter_id: reqBody.headquarters_id ? reqBody.headquarters_id : null,
        note: reqBody.note ? reqBody.note : null,
        status: "active",
        created_by: userId,
        created_at: await customDateTimeHelper.getCurrentDateTime(),
      };
      const resultContactPerson = await model.db.contactPersons.create(data);
      if (resultContactPerson) {
        const contactPersonId = resultContactPerson.id;

        //Insert customer contact person
        const dataCustomerContactPerson = {
          customer_id: reqBody.customer_id,
          person_type: reqBody.person_type,
          contact_person_id: contactPersonId,
          note: reqBody.note ? reqBody.note : null,
          status: "active",
          created_by: userId,
          created_at: await customDateTimeHelper.getCurrentDateTime(),
        };
        await model.db.customerContactPersons.create(dataCustomerContactPerson);
      }
    }

    res.ok({
      message: res.__("Saved successfully"),
    });
  } catch (error) {
    next(error);
  }
};
