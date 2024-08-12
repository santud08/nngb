import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class investigationMethod extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
    }
  }
  investigationMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      investigation_method: {
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
      modelName: "investigationMethod",
      tableName: MASTERDB.TABLES.INVESTIGATION_METHOD,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return investigationMethod;
};
