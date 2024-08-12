import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class departments extends Model {
    // static associate({ faq }) {
    //   this.hasMany(faq, { foreignKey: "faq_category_id" });
    // }
  }
  departments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: DataTypes.STRING,
      parent_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      modelName: "departments",
      tableName: MASTERDB.TABLES.DEPARTMENT_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return departments;
};
