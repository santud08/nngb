import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class project extends Model {
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
    }
  }
  project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_code: {
        type: DataTypes.STRING(255),
      },
      project_subject: {
        type: DataTypes.ENUM("global_research_group", "etc"),
      },
      intranet_project_code: {
        type: DataTypes.STRING(255),
      },
      customer_id: {
        type: DataTypes.INTEGER,
      },
      vendor_person_in_charge: {
        type: DataTypes.INTEGER,
      },
      project_name: {
        type: DataTypes.STRING(255),
      },
      project_start_day: {
        type: DataTypes.DATE,
      },
      project_end_day: {
        type: DataTypes.DATE,
      },
      project_progress: {
        type: DataTypes.INTEGER,
      },
      internal_pm: {
        type: DataTypes.INTEGER,
      },
      industry_level_1: {
        type: DataTypes.INTEGER,
      },
      industry_level_2: {
        type: DataTypes.INTEGER,
      },
      scope_of_service: {
        type: DataTypes.STRING(255),
      },
      total_amount: {
        type: DataTypes.DECIMAL,
      },
      note: {
        type: DataTypes.TEXT,
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
    },
    {
      sequelize,
      modelName: "project",
      tableName: MASTERDB.TABLES.PROJECT,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return project;
};
