import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class duplicateCheckMethod extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
    }
  }
  duplicateCheckMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      method_name: {
        type: DataTypes.STRING(255),
      },
      checked_field: {
        type: DataTypes.STRING(255),
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
      modelName: "duplicateCheckMethod",
      tableName: MASTERDB.TABLES.DUPLICATE_CHECK_METHODS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return duplicateCheckMethod;
};
