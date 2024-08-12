import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class bu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  bu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      bu_name: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "bu",
      tableName: MASTERDB.TABLES.BU_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return bu;
};
