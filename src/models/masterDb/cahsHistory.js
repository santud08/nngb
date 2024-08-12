import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class cahsHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: "ucode" });
    }
  }
  cahsHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ucode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      business_id: DataTypes.INTEGER,
      btype: DataTypes.INTEGER,
      cash: DataTypes.INTEGER,
      total_cash: DataTypes.INTEGER,
      check_cash: DataTypes.INTEGER,
      tid: DataTypes.STRING(255),
      gubun: DataTypes.STRING(255),
      refund_key: DataTypes.INTEGER,
      title: DataTypes.STRING(255),
      memo: DataTypes.STRING(255),
      ref_ip: DataTypes.STRING(255),
      vendor_id: DataTypes.INTEGER,
      vendor_userkey: DataTypes.STRING(255),
      reg_day: DataTypes.DATE,
      reg_milisec: DataTypes.TIME,
      blind_yn: {
        type: DataTypes.ENUM("Y", "N"),
        defaultValue: "N",
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
      modelName: "cahsHistory",
      tableName: MASTERDB.TABLES.CASH_HISTORY,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return cahsHistory;
};
