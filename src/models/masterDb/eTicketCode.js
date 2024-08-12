import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class eTicketCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ eTicketCodeCategory, eTicketOrder }) {
      this.hasMany(eTicketOrder, {
        foreignKey: "ticket_Id",
        constraints: true,
      });
      // define association here
      this.belongsTo(eTicketCodeCategory, { foreignKey: "category_id" });
    }
  }
  eTicketCode.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_code: DataTypes.STRING,
      business_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      ticket_name: DataTypes.STRING,
      brand_name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 0),
      img_url: DataTypes.STRING,
      detail: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
      exp_start_date: DataTypes.DATE,
      exp_end_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "eTicketCode",
      tableName: MASTERDB.TABLES.E_TICKET_CODE_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return eTicketCode;
};
