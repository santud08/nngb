import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
import { formatDate } from "../../config/index.js";
export default (sequelize, DataTypes) => {
  class subAccount extends Model {
    static associate({ account }) {
      this.belongsTo(account, { foreignKey: "account_id" });
    }
  }
  subAccount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_number: DataTypes.INTEGER,
      account_type: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      open_date: {
        type: DataTypes.DATE,
        get() {
          return formatDate(this.getDataValue("open_date"));
        },
      },

      account_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "account",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
      created_at: {
        type: DataTypes.DATE,
        get() {
          return formatDate(this.getDataValue("created_at"));
        },
      },
      updated_at: {
        type: DataTypes.DATE,
        get() {
          return formatDate(this.getDataValue("updated_at"));
        },
      },
    },
    {
      sequelize,
      modelName: "subAccounts",
      tableName: MASTERDB.TABLES.ACCOUNT_SUBACCOUNT_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return subAccount;
};
