import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subpanelQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ subpanelQuestionOption }) {
      // define association here
      this.hasMany(subpanelQuestionOption, { foreignKey: "question_id" });
    }
  }
  subpanelQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subpanel_id: DataTypes.INTEGER,
      subpanel_question: DataTypes.STRING,
      question_type: {
        type: DataTypes.ENUM("single_option_answer", "multiple_option_answer", "short_description"),
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
      modelName: "subpanelQuestion",
      tableName: MASTERDB.TABLES.SUBPANEL_QUESTION_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subpanelQuestion;
};
