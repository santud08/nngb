import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subProject extends Model {
    static associate({ user, business, investigationMethod, project, subProjectSteps }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });

      this.hasOne(user, {
        foreignKey: "id",
        sourceKey: "contact_person_id",
        constraints: true,
      });
      this.hasOne(project, {
        foreignKey: "id",
        sourceKey: "project_id",
        constraints: true,
      });
      this.hasOne(subProjectSteps, {
        foreignKey: "id",
        sourceKey: "sub_project_progress_id",
        constraints: true,
      });

      this.hasOne(business, {
        foreignKey: "id",
        sourceKey: "business_id",
        constraints: true,
      });
      this.hasOne(investigationMethod, {
        foreignKey: "id",
        sourceKey: "investigation_method_id",
        constraints: true,
      });
    }
  }
  subProject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
      },
      subproject_name: {
        type: DataTypes.STRING(255),
      },
      contact_person_id: {
        type: DataTypes.INTEGER,
      },
      sub_project_progress_id: {
        type: DataTypes.INTEGER,
      },
      investigation_method_id: {
        type: DataTypes.INTEGER,
      },
      development_difficulty: {
        type: DataTypes.ENUM("image", "center", "work"),
        allowNull: true,
      },
      project_end_day: {
        type: DataTypes.DATE,
      },
      business_id: {
        type: DataTypes.INTEGER,
      },
      no_of_samples: {
        type: DataTypes.INTEGER,
      },
      sample_unit_price: {
        type: DataTypes.DECIMAL,
      },
      additional_amount: {
        type: DataTypes.DECIMAL,
      },
      discount_amount: {
        type: DataTypes.DECIMAL,
      },
      file_original_name: {
        type: DataTypes.STRING,
      },
      file_name: {
        type: DataTypes.STRING,
      },
      file_path: {
        type: DataTypes.STRING,
      },
      subproject_code: {
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
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
      modelName: "subProject",
      tableName: MASTERDB.TABLES.SUB_PROJECT,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subProject;
};
