import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class contactPersons extends Model {
    static associate({ customerContactPersons }) {
      //this.hasOne(bu, { foreignKey: "id", sourceKey: "bu_id", constraints: true });
      //this.hasOne(team, { foreignKey: "id", sourceKey: "team_id", constraints: true });
      // this.hasOne(headquarter, {
      //   foreignKey: "id",
      //   sourceKey: "headquarter_id",
      //   constraints: true,
      // });
      this.hasMany(customerContactPersons, {
        foreignKey: "contact_person_id",
        constraints: true,
      });
    }
  }
  contactPersons.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hcode: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      contact_no: DataTypes.STRING,
      rank: DataTypes.STRING,
      bu_id: DataTypes.STRING,
      team_id: DataTypes.STRING,
      headquarter_id: DataTypes.STRING,
      note: DataTypes.STRING,
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
      modelName: "contactPersons",
      tableName: MASTERDB.TABLES.CONTACT_PERSONS_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return contactPersons;
};
