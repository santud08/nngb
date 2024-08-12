import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
export default (sequelize, DataTypes) => {
  class inquiry extends Model {
    static associate({ user, inquiryCategory, inquiry, adminUsers }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.belongsTo(inquiryCategory, { foreignKey: "inquiry_category_id" });
      this.hasMany(inquiry, { as: "replyQuestion", foreignKey: "parent_id" });
      this.hasOne(user, {
        as: "inquirer",
        foreignKey: "id",
        sourceKey: "created_by",
        constraints: true,
      });
    }
  }
  inquiry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: DataTypes.INTEGER,
      },
      inquiry_category_id: {
        type: DataTypes.INTEGER,
      },
      inquiry_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      inquiry_description: {
        type: DataTypes.TEXT,
      },
      inquiry_answer: {
        type: DataTypes.TEXT,
      },
      inquiry_status: {
        type: DataTypes.ENUM("pending", "answered"),
        allowNull: false,
        defaultValue: "pending",
      },
      replied_at: {
        type: DataTypes.DATE,
      },
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "deleted"),
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
      modelName: "inquiry",
      tableName: MASTERDB.TABLES.INQUIRY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return inquiry;
};
