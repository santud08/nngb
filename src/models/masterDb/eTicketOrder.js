import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class eTicketOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ eTicketCode, user }) {
      this.belongsTo(eTicketCode, { foreignKey: "ticket_Id" });
      this.belongsTo(user, { foreignKey: "ucode" });
    }
  }
  eTicketOrder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ucode: DataTypes.INTEGER,
      ticket_Id: DataTypes.STRING,

      title: {
        type: DataTypes.STRING(255),
      },
      tid: {
        type: DataTypes.STRING(50),
      },
      order_price: DataTypes.DECIMAL(10, 0),
      ncash_used: DataTypes.DECIMAL(10, 0),
      webhard_used: DataTypes.DECIMAL(10, 0),
      webhard_charge: DataTypes.DECIMAL(10, 0),
      other_charge: DataTypes.DECIMAL(10, 0),
      request_status: {
        type: DataTypes.ENUM("pending", "refuse", "completed"),
        defaultValue: "pending",
      },
      confirmed_at: DataTypes.DATE,
      confirmed_by: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "eTicketOrder",
      tableName: MASTERDB.TABLES.E_TICKET_ORDER_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return eTicketOrder;
};
