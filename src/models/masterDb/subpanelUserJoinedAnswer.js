import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class subpanelUserJoinedAnswer extends Model {
    static associate(/*{ opinion }*/) {
      // define association here
      //this.belongsTo(opinion, { foreignKey: "opinion_id" });
    }
  }
  subpanelUserJoinedAnswer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subpanel_user_joined_id: DataTypes.INTEGER,
      subpanel_questions_id: DataTypes.INTEGER,
      subpanel_questions_options_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
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
      modelName: "subpanelUserJoinedAnswer",
      tableName: MASTERDB.TABLES.SUBPANEL_USER_JOINED_ANSWER_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subpanelUserJoinedAnswer;
};
