import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subProjectStepsData extends Model {
    static associate({ user, subProject, subProjectSteps }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.hasOne(subProject, { foreignKey: "id", sourceKey: "sub_project_id", constraints: true });
      this.hasOne(subProjectSteps, {
        foreignKey: "id",
        sourceKey: "sub_project_steps_id",
        constraints: true,
      });
    }
  }
  subProjectStepsData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sub_project_id: {
        type: DataTypes.INTEGER,
      },
      sub_project_steps_id: {
        type: DataTypes.INTEGER,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
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
      modelName: "subProjectStepsData",
      tableName: MASTERDB.TABLES.SUBPROJECT_STEPS_DATA,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subProjectStepsData;
};
