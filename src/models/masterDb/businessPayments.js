import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class businessPayments extends Model {
    static associate({ user, business }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.belongsTo(business, { foreignKey: "business_id" });
    }
  }
  businessPayments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      business_id: {
        type: DataTypes.INTEGER,
      },
      collateral_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      transac_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "businessPayments",
      tableName: MASTERDB.TABLES.BUSINESS_PAYMENTS,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return businessPayments;
};
