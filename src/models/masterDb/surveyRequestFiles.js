import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class surveyRequestFiles extends Model {
    static associate({ surveyRequest }) {
      this.hasMany(surveyRequest, { as: "survey", foreignKey: "survey_request_id" });
      this.hasOne(surveyRequest, {
        foreignKey: "id",
        sourceKey: "survey_request_id",
        constraints: true,
      });
    }
  }
  surveyRequestFiles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      survey_request_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "surveyRequest",
          key: "id",
        },
      },
      filename: DataTypes.STRING,
      originalname: DataTypes.STRING,
      path: DataTypes.STRING,
      size: DataTypes.INTEGER,
      mime_type: DataTypes.STRING,
      location: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
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
      modelName: "surveyRequestFiles",
      tableName: MASTERDB.TABLES.SURVEY_REQUEST_FILES,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return surveyRequestFiles;
};
