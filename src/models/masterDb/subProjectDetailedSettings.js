import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subProjectDetailedSettings extends Model {
    static associate({ user, subProject }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.hasMany(subProject, { foreignKey: "sub_project_id" });
    }
  }
  subProjectDetailedSettings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sub_project_id: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.ENUM("female", "other"),
      },
      min_age: {
        type: DataTypes.INTEGER,
      },
      max_age: {
        type: DataTypes.INTEGER,
      },
      note: {
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
      modelName: "subProjectDetailedSettings",
      tableName: MASTERDB.TABLES.SUBPROJECT_DETAILED_SETTING,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subProjectDetailedSettings;
};
