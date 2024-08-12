import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class businessConversionRestriction extends Model {
    static associate({ user, business }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.belongsTo(business, { foreignKey: "business_id" });
    }
  }
  businessConversionRestriction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      business_id: {
        type: DataTypes.INTEGER,
      },
      required_min_cache: {
        type: DataTypes.INTEGER,
      },
      required_min_unit_cache: {
        type: DataTypes.INTEGER,
      },
      limited_max_cache: {
        type: DataTypes.INTEGER,
      },
      unit: {
        type: DataTypes.ENUM("pc", "pd", "pw", "pm"),
        defaultValue: null,
      },
      limited_transaction_cash: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
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
      modelName: "businessConversionRestriction",
      tableName: MASTERDB.TABLES.BUSINESS_CONVERSION_RESTRICTION_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return businessConversionRestriction;
};
