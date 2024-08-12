import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
export default (sequelize, DataTypes) => {
  class surveyRequest extends Model {
    static associate({ user, surveyRequestFiles }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.hasMany(surveyRequestFiles, { as: "surveyFiles", foreignKey: "survey_request_id" });
    }
  }
  surveyRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      company_name: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      survey_condition: {
        type: DataTypes.STRING,
      },
      investigation_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      investigation_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      survey_target: {
        type: DataTypes.STRING,
      },
      survey_content: {
        type: DataTypes.STRING,
      },
      survey_methods: {
        type: DataTypes.STRING,
      },
      acquisition_channel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: true,
      },
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
      modelName: "surveyRequest",
      tableName: MASTERDB.TABLES.SURVEY_REQUEST,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return surveyRequest;
};
