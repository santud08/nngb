import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class eTicketCodeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ eTicketCode }) {
      // define association here
      this.hasMany(eTicketCode, {
        //as: "emailTemplate",
        foreignKey: "category_id",
        constraints: true,
      });
    }
  }
  eTicketCodeCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: DataTypes.STRING,
      description: DataTypes.STRING,
      img_url: DataTypes.STRING,
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
      modelName: "eTicketCodeCategory",
      tableName: MASTERDB.TABLES.E_TICKET_CODE_CATEGORY_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return eTicketCodeCategory;
};
