import { Model, Sequelize } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
import { formatDate } from "../../config/index.js";
export default (sequelize, DataTypes) => {
  class account extends Model {
    static associate({ customer, subAccount }) {
      this.belongsTo(customer, { foreignKey: "customer_id" });
      this.hasMany(subAccount, { foreignKey: "account_id" });
    }
    static async getAccountsByStatus(status) {
      const accounts = await account.findAll({
        where: { status: status },
      });
      return accounts;
    }

    static async getAccountsWithCustomerAndTotalBalance() {
      const accounts = await this.findAll({
        include: [
          {
            association: this.associations.customer,
            attributes: ["first_name", "last_name", "address"],
          },
          {
            association: this.associations.subAccounts,
            attributes: ["id", "account_number", "account_type", "balance"],
            required: false,
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(
                "(SELECT COALESCE(SUM(`ng_sub_accounts`.`balance`), 0) + `accounts`.`balance` FROM `ng_sub_accounts` WHERE `ng_sub_accounts`.`account_id` = `accounts`.`id`)",
              ),
              "total_balance",
            ],
          ],
          exclude: ["customer_id", "balance"],
        },
        raw: true,
        nest: true,
        group: ["accounts.id", "customer.id", "subAccounts.id"],
      });

      return accounts;
    }
  }
  account.init(
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
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "customer",
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
      modelName: "accounts",
      tableName: MASTERDB.TABLES.ACCOUNT_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return account;
};
