import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class faqCategory extends Model {
    static associate({ faq }) {
      this.hasMany(faq, { foreignKey: "faq_category_id" });
    }
  }
  faqCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faq_category_name: DataTypes.STRING,
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
      modelName: "faqCategory",
      tableName: MASTERDB.TABLES.FAQ_CATEGORY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return faqCategory;
};
