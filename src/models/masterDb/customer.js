import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class customer extends Model {
    static associate({
      adminUsers,
      business,
      customerBusiness,
      customerContactPersons,
      ncashExchange,
    }) {
      this.belongsTo(adminUsers, { foreignKey: "created_by" });
      //this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.hasMany(customerBusiness, {
        foreignKey: "vendor_id",
        constraints: true,
      });
      this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.hasMany(business, {
        foreignKey: "vendor_id",
        constraints: true,
      });

      this.hasOne(adminUsers, {
        as: "affilateUser",
        foreignKey: "vendor_id",
        sourceKey: "id",
        constraints: true,
      });
      this.hasMany(customerContactPersons, {
        as: "outsidePerson",
        foreignKey: "customer_id",
        sourceKey: "id",
        constraints: true,
      });
      this.hasMany(ncashExchange, {
        foreignKey: "vendor_id",
        sourceKey: "id",
        constraints: true,
      });
    }
  }
  customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("corporation", "individual"),
        allowNull: false,
      },
      company_customer_name: {
        type: DataTypes.STRING,
      },
      is_bu: {
        type: DataTypes.ENUM("y", "n"),
        allowNull: false,
        defaultValue: "n",
      },
      company_registration_no: {
        type: DataTypes.STRING,
      },
      mobile_no: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      address_details: {
        type: DataTypes.TEXT,
      },
      phone_no: {
        type: DataTypes.STRING,
      },
      contact_phone_no: {
        type: DataTypes.STRING,
      },
      vendor_type: {
        type: DataTypes.STRING,
      },
      registration_certificate: {
        type: DataTypes.STRING,
      },
      registration_certificate_original_filename: {
        type: DataTypes.STRING,
      },
      registration_certificate_file_name: {
        type: DataTypes.STRING,
      },
      bank_book: {
        type: DataTypes.STRING,
      },
      bank_book_original_file_name: {
        type: DataTypes.STRING,
      },
      bank_book_file_name: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "customer",
      tableName: MASTERDB.TABLES.CUSTOMERS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return customer;
};
