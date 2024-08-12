import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class ncashExchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, business, businessTypes, customer }) {
      this.belongsTo(user, { foreignKey: "ucode" });
      this.belongsTo(business, { foreignKey: "business_id" });
      this.belongsTo(businessTypes, { foreignKey: "btype" });
      this.belongsTo(customer, { foreignKey: "vendor_id" });
    }
  }
  ncashExchange.init(
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
      business_id: {
        type: DataTypes.INTEGER,
      },
      btype: {
        type: DataTypes.INTEGER,
      },
      cash: {
        type: DataTypes.DECIMAL,
      },
      tid: {
        type: DataTypes.STRING(255),
      },
      title: {
        type: DataTypes.STRING(255),
      },
      ref_ip: {
        type: DataTypes.STRING(255),
      },
      vendor_id: DataTypes.INTEGER,
      vendor_userkey: DataTypes.STRING(255),
      confirmed_by: DataTypes.DATE,
      confirmed_at: DataTypes.TIME,
      request_status: {
        type: DataTypes.ENUM("pending", "refuse", "completed"),
        defaultValue: "pending",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
      no_of_approval: {
        type: DataTypes.INTEGER,
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ncashExchange",
      tableName: MASTERDB.TABLES.NCASH_EXCHANGE_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return ncashExchange;
};
