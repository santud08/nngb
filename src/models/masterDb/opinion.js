import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class opinion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ opinionItem, opinionAnswer }) {
      // define association here
      this.hasMany(opinionItem, { foreignKey: "opinion_id" });
      this.hasMany(opinionAnswer, { foreignKey: "opinion_id" });
    }
  }
  opinion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      opinion_section: {
        type: DataTypes.ENUM("daily", "weekly", "monthly"),
        allowNull: false,
      },
      opinion_title: DataTypes.STRING,
      opinion_description: DataTypes.STRING,
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: false,
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      point: DataTypes.INTEGER,
      opinion_type: {
        type: DataTypes.ENUM("single", "multiple"),
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
      modelName: "opinion",
      tableName: MASTERDB.TABLES.OPINION_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return opinion;
};
