import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class announcementCategory extends Model {
    static associate({ announcement }) {
      this.hasMany(announcement, { foreignKey: "announcement_category_id" });
    }
  }
  announcementCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: DataTypes.STRING,
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "announcementCategory",
      tableName: MASTERDB.TABLES.ANNOUNCEMENT_CATEGORY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return announcementCategory;
};
