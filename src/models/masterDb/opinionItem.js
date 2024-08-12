import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class opinionItem extends Model {
    static associate({ opinion }) {
      // define association here
      this.belongsTo(opinion, { foreignKey: "opinion_id" });
    }
  }
  opinionItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      opinion_id: DataTypes.INTEGER,
      opinion_item_title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "opinionItem",
      tableName: MASTERDB.TABLES.OPINION_ITEM_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return opinionItem;
};
