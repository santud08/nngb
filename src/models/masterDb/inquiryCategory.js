import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class inquiryCategory extends Model {
    static associate({ inquiry }) {
      this.hasMany(inquiry, { foreignKey: "inquiry_category_id" });
    }
  }
  inquiryCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: false,
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
        references: {
          model: "user",
          key: "id",
        },
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "inquiryCategory",
      tableName: MASTERDB.TABLES.INQUIRY_CATEGORY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return inquiryCategory;
};
