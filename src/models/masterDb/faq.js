import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ faqCategory }) {
      // define association here
      this.belongsTo(faqCategory, { foreignKey: "faq_category_id" });
    }
  }
  faq.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faq_category_id: DataTypes.INTEGER,
      faq_title: DataTypes.STRING,
      faq_description: DataTypes.STRING,
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
      modelName: "faq",
      tableName: MASTERDB.TABLES.FAQ_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return faq;
};
