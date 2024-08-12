import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class surveyMethods extends Model {
    static associate({ surveyRequest }) {
      this.hasMany(surveyRequest, { foreignKey: "survey_request_id" });
    }
  }
  surveyMethods.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      survey_request_id: DataTypes.INTEGER,
      survey_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "surveyMethods",
      tableName: MASTERDB.TABLES.SURVEY_METHODS,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return surveyMethods;
};
