import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class bannerClickCount extends Model {
    static associate({ user, banner, adminUsers }) {
      this.belongsTo(adminUsers, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
      this.belongsTo(banner, { foreignKey: "banner_id" });
    }
  }
  bannerClickCount.init(
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      banner_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      view_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      click_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER(11),
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER(11),
      },
    },
    {
      sequelize,
      modelName: "bannerClickCount",
      tableName: MASTERDB.TABLES.BANNER_CLICK_COUNT_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return bannerClickCount;
};
