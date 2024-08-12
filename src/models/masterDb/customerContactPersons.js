import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class customerContactPersons extends Model {
    static associate({ contactPersons, adminUsers, customer }) {
      this.belongsTo(adminUsers, {
        foreignKey: "contact_person_id",
        sourceKey: "contact_person_id",
        constraints: true, // To avoid constraints when joining
        // on: {
        //   //contact_person_id: sequelize.col("customerContactPersons.contact_person_id"),
        //   person_type: "interior", // Apply the filter on the left side of the join
        // },
        scope: {
          "$customerContactPersons.person_type$": "interior", // Only retrieve orders with status 'completed'
        },
      });

      this.hasOne(contactPersons, {
        foreignKey: "id",
        sourceKey: "contact_person_id",
        constraints: true, // To avoid constraints when joining
        scope: {
          "$customerContactPersons.person_type$": "outside", // Only retrieve orders with status 'completed'
        },
        // on: {
        //   //contact_person_id: sequelize.col("customerContactPersons.contact_person_id"),
        //   person_type: "outside", // Apply the filter on the left side of the join
        // },
      });
      this.hasOne(customer, {
        foreignKey: "id",
        sourceKey: "customer_id",
        constraints: true,
      });
    }
  }
  customerContactPersons.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.INTEGER,
      person_type: {
        type: DataTypes.ENUM("interior", "outside"),
        allowNull: false,
      },
      contact_person_id: DataTypes.INTEGER,
      note: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "customerContactPersons",
      tableName: MASTERDB.TABLES.CUSTOMER_CONTACT_PERSONS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return customerContactPersons;
};
