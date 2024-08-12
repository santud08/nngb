import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class customerBusiness extends Model {
    static associate({ adminUsers, customer }) {
      this.belongsTo(adminUsers, { foreignKey: "created_by" });
      this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.belongsTo(customer, { foreignKey: "vendor_id" });
    }
  }
  customerBusiness.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      btype: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      service_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      earn_cash: {
        type: DataTypes.DECIMAL,
      },
      duplicate_check_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gubun: {
        type: DataTypes.INTEGER,
      },
      memo: {
        type: DataTypes.TEXT,
      },
      module_format: {
        type: DataTypes.ENUM("option", "xml-api-server", "xml-api-client"),
      },
      is_confirm: {
        type: DataTypes.ENUM("y", "n"),
        allowNull: false,
      },
      encryption_format: {
        type: DataTypes.ENUM("option", "aes128", "seed128"),
      },
      encryption_key: {
        type: DataTypes.STRING,
      },
      connection_url: {
        type: DataTypes.STRING,
      },
      authentication_method: {
        type: DataTypes.STRING,
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
      modelName: "customerBusiness",
      tableName: MASTERDB.TABLES.CUSTOMER_BUSINESS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return customerBusiness;
};
