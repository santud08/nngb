import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subpanelUserJoined extends Model {
    static associate({ subpanelUserJoinedAnswer, user, subpanel }) {
      // define association here
      this.belongsTo(user, { foreignKey: "user_id" });
      this.hasMany(subpanelUserJoinedAnswer, { foreignKey: "subpanel_user_joined_id" });
      this.belongsTo(subpanel, { foreignKey: "subpanel_id" });
    }
  }
  subpanelUserJoined.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      subpanel_id: DataTypes.INTEGER,
      is_joined: {
        type: DataTypes.ENUM("y", "n"),
        defaultValue: "y",
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
      modelName: "subpanelUserJoined",
      tableName: MASTERDB.TABLES.SUBPANEL_USER_JOINED_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subpanelUserJoined;
};
