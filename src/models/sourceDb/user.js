import { Model } from "sequelize";
import { SOURCEDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  user.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NAME: DataTypes.STRING,
      EMAIL: DataTypes.STRING,
      AGE: DataTypes.INTEGER,
      // createdAt: DataTypes.DATE,
      // updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "USER",
      tableName: SOURCEDB.TABLES.USER_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return user;
};
