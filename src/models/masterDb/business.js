import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class business extends Model {
    static associate({
      user,
      customer,
      businessTypes,
      duplicateCheckMethod,
      businessRestrictionRegistration,
      businessPayments,
    }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.hasMany(businessRestrictionRegistration, {
        foreignKey: "business_id",
        constraints: true,
      });
      this.hasMany(businessPayments, { foreignKey: "business_id", constraints: true });

      this.hasOne(customer, {
        foreignKey: "id",
        sourceKey: "vendor_id",
        constraints: true,
      });
      this.hasOne(businessTypes, {
        foreignKey: "id",
        sourceKey: "btype",
        constraints: true,
      });
      this.hasOne(duplicateCheckMethod, {
        foreignKey: "id",
        sourceKey: "duplicate_check_method",
        constraints: true,
      });
    }
  }
  business.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING(255),
      },
      btype: {
        type: DataTypes.INTEGER,
      },
      business_name: {
        type: DataTypes.STRING(255),
      },
      vendor_id: {
        type: DataTypes.INTEGER,
      },
      service_start_date: {
        type: DataTypes.DATE,
      },
      service_end_date: {
        type: DataTypes.DATE,
      },
      earn_cash: {
        type: DataTypes.DECIMAL,
      },
      duplicate_check_method: {
        type: DataTypes.INTEGER,
      },
      gubun: {
        type: DataTypes.INTEGER,
      },
      memo: {
        type: DataTypes.TEXT,
      },
      module_format: {
        type: DataTypes.ENUM("option", "xml-api-server", "xml-api-client"),
        allowNull: true,
      },
      is_confirm: {
        type: DataTypes.ENUM("y", "n"),
        allowNull: false,
        defaultValue: "n",
      },
      encryption_format: {
        type: DataTypes.ENUM("option", "aes128", "seed128"),
        allowNull: true,
      },
      encryption_key: {
        type: DataTypes.STRING(255),
      },
      connection_url: {
        type: DataTypes.STRING(255),
      },
      authentication_method: {
        type: DataTypes.STRING(255),
      },
      conversion_rate_from: {
        type: DataTypes.DECIMAL,
      },
      conversion_rate_to: {
        type: DataTypes.DECIMAL,
      },
      company_fees: {
        type: DataTypes.DECIMAL,
      },
      member_fees: {
        type: DataTypes.DECIMAL,
      },
      logo: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "business",
      tableName: MASTERDB.TABLES.BUSINESS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return business;
};
