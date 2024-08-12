import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class detailedSettingsRegion extends Model {
    static associate({ user, subProjectDetailedSettings }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.hasMany(subProjectDetailedSettings, { foreignKey: "setting_id" });
    }
  }
  detailedSettingsRegion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      setting_id: {
        type: DataTypes.INTEGER,
      },
      region_id: {
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
      modelName: "detailedSettingsRegion",
      tableName: MASTERDB.TABLES.SUBPROJECT_REGION,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return detailedSettingsRegion;
};
