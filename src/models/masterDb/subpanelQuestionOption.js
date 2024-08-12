import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subpanelQuestionOption extends Model {
    static associate() {
      // define association here
    }
  }
  subpanelQuestionOption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question_id: DataTypes.INTEGER,
      option_title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "subpanelQuestionOption",
      tableName: MASTERDB.TABLES.SUBPANEL_QUESTION_OPTIONS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subpanelQuestionOption;
};
