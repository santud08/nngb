import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class opinionAnswer extends Model {
    static associate({ opinion }) {
      // define association here
      this.belongsTo(opinion, { foreignKey: "opinion_id" });
    }
  }
  opinionAnswer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      opinion_id: DataTypes.INTEGER,
      opinion_item_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
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
      modelName: "opinionAnswer",
      tableName: MASTERDB.TABLES.OPINION_ANSWER_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return opinionAnswer;
};
