import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class companySettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsTo(user, { foreignKey: "created_by" });
    }
  }
  companySettings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      company_email: {
        type: DataTypes.STRING(255),
      },
      support_email: {
        type: DataTypes.STRING(255),
      },
      facebook_link: {
        type: DataTypes.TEXT,
      },
      naver_link: {
        type: DataTypes.TEXT,
      },
      twitter_link: {
        type: DataTypes.TEXT,
      },
      company_start_year: {
        type: DataTypes.STRING(255),
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
      },
    },
    {
      sequelize,
      modelName: "companySettings",
      tableName: MASTERDB.TABLES.COMPANY_SETTINGS,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return companySettings;
};
