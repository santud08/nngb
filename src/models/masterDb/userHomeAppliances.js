import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class userHomeAppliances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, homeAppliances }) {
      // define association here
      this.belongsTo(user, { foreignKey: "user_id" });
      this.belongsTo(homeAppliances, { foreignKey: "appliance_id" });
    }
  }
  userHomeAppliances.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      appliance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "homeAppliances",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "userHomeAppliances",
      tableName: MASTERDB.TABLES.USER_HOME_APPLIANCES_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return userHomeAppliances;
};
