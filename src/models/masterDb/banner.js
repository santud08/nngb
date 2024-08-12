import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class banner extends Model {
    static associate({ adminUsers, bannerClickCount }) {
      this.belongsTo(adminUsers, { foreignKey: "created_by" });
      this.belongsTo(adminUsers, { foreignKey: "updated_by" });
      this.hasMany(bannerClickCount, {
        foreignKey: "banner_id",
        constraints: true,
      });
    }
  }
  banner.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      banner_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      exposure_period_start_date: {
        type: DataTypes.DATE,
      },
      exposure_period_end_date: {
        type: DataTypes.DATE,
      },
      banner_image_pc_original_filename: {
        type: DataTypes.STRING(255),
      },
      banner_image_pc_filename: {
        type: DataTypes.STRING(255),
      },
      banner_image_pc_path: {
        type: DataTypes.STRING(255),
      },
      banner_image_mobile_original_filename: {
        type: DataTypes.STRING(255),
      },
      banner_image_mobile_filename: {
        type: DataTypes.STRING(255),
      },
      banner_image_mobile_path: {
        type: DataTypes.STRING(255),
      },
      link_url: {
        type: DataTypes.STRING(255),
      },
      link_target: {
        type: DataTypes.ENUM("same_tab", "new_tab"),
      },
      priority: {
        type: DataTypes.INTEGER,
      },
      acquisition_channel: {
        type: DataTypes.ENUM("netpoint", "smart_panel"),
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
        type: DataTypes.INTEGER(11),
      },
      updated_at: {
        type: DataTypes.DATE,
        onUpdate: DataTypes.NOW,
      },
      updated_by: {
        type: DataTypes.INTEGER(11),
      },
    },
    {
      sequelize,
      modelName: "banner",
      tableName: MASTERDB.TABLES.BANNER_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return banner;
};
