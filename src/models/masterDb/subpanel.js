import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subpanel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ subpanelQuestion, subpanelUserJoined }) {
      // define association here
      this.hasMany(subpanelQuestion, { foreignKey: "subpanel_id" });
      this.hasOne(subpanelUserJoined, { foreignKey: "subpanel_id" });
    }
  }
  subpanel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subpanel_title: DataTypes.STRING,
      panel: {
        type: DataTypes.ENUM("smart_panel", "netpoint"),
        allowNull: true,
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
      modelName: "subpanel",
      tableName: MASTERDB.TABLES.SUBPANEL_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subpanel;
};
