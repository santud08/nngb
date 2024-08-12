import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ emailTemplate }) {
    //   // define association here
    //   this.hasMany(emailTemplate, {
    //     //as: "emailTemplate",
    //     foreignKey: "created_by",
    //     constraints: true,
    //   });
    // }
  }
  pages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      meta: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      site_language: {
        type: DataTypes.STRING(6),
        defaultValue: "en",
      },
      published_at: {
        type: DataTypes.DATE,
        defaultValue: null,
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
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "pages",
      tableName: MASTERDB.TABLES.CUSTOM_PAGES_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return pages;
};
