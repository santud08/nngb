import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class businessRestrictionRegistration extends Model {
    static associate({ user, business }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.belongsTo(business, { foreignKey: "business_id" });
    }
  }
  businessRestrictionRegistration.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      business_id: {
        type: DataTypes.INTEGER,
      },
      restric_business_id: {
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
      modelName: "businessRestrictionRegistration",
      tableName: MASTERDB.TABLES.BUSINESS_RESTRICTION_REGISTRATION_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return businessRestrictionRegistration;
};
