import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
export default (sequelize, DataTypes) => {
  class industry extends Model {
    static associate({ user, adminUsers, industry }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.hasMany(industry, { as: "ParentId", foreignKey: "parent" });
      this.belongsTo(industry, { foreignKey: "parent", as: "ParentData" });

      this.hasOne(user, {
        as: "industries",
        foreignKey: "id",
        sourceKey: "created_by",
        constraints: true,
      });
    }
  }
  industry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      industry_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      industry_step: {
        type: DataTypes.ENUM("level-1", "step-2"),
        allowNull: false,
      },
      parent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "industry",
      tableName: MASTERDB.TABLES.INDUSTRY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return industry;
};
