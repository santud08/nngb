import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class userAdditionalInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, sportsList, hobbyList }) {
      // define association here
      this.belongsTo(user, { foreignKey: "user_id" });
      this.hasOne(sportsList, {
        foreignKey: "id",
        sourceKey: "sport_on_regular_basis",
        constraints: true,
      });
      this.hasOne(hobbyList, {
        foreignKey: "id",
        sourceKey: "hobby",
        constraints: true,
      });
    }
  }
  userAdditionalInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      marital_status: {
        type: DataTypes.ENUM("single", "unmarried", "married", "divorce", "widow"),
        defaultValue: null,
      },
      house_wife: {
        type: DataTypes.ENUM("housewife", "working_housewife", "not_a_housewife"),
        defaultValue: null,
      },
      furniture: {
        type: DataTypes.ENUM("oph", "mcrs", "cuc", "spuc", "ahw3omg"),
        defaultValue: null,
      },
      household_income: {
        type: DataTypes.ENUM(
          "lt10mwpy",
          "mt10mwtolt30mwpy",
          "mt30mwtolt50wpy",
          "mt50mwtolt70mwpy",
          "mt70mwtolt100mwpy",
          "okrw100mpy",
        ),
        defaultValue: null,
      },
      housing_type: {
        type: DataTypes.ENUM(
          "officetels",
          "apartment",
          "house",
          "residential_complex",
          "township_villa",
          "etc",
        ),
        defaultValue: null,
      },
      form_of_home_ownership: {
        type: DataTypes.ENUM(
          "own",
          "charter",
          "monthly",
          "permanent_lease",
          "private_house",
          "etc",
        ),
        defaultValue: null,
      },
      dwelling_house_size: {
        type: DataTypes.ENUM("lt9p", "1019p", "2029p", "3039p", "4049p", "mt50p"),
        defaultValue: null,
      },
      last_degree: {
        type: DataTypes.ENUM("lthsg", "hsg", "ac", "cg", "ags", "gsgc"),
        defaultValue: null,
      },
      job: {
        type: DataTypes.ENUM(
          "aff",
          "po",
          "ti",
          "p",
          "mp",
          "dj",
          "ptl",
          "sssp",
          "se",
          "ff",
          "s",
          "i",
          "etc",
        ),
        defaultValue: null,
      },
      cell_phone_type: {
        type: DataTypes.ENUM("gmp", "smartphone", "ubrmpas", "dump"),
        defaultValue: null,
      },
      cell_phone_manufacturer: {
        type: DataTypes.ENUM("samsung", "lg_electronics", "apple", "etc"),
        defaultValue: null,
      },
      telecommunication_carrier: {
        type: DataTypes.ENUM("skt", "kt", "lgt", "cheap_phone"),
        defaultValue: null,
      },
      vehicle_possession: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: null,
      },
      vehicle_type: {
        type: DataTypes.ENUM("domestic", "imported"),
        defaultValue: null,
      },
      vehicle_brand: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      vehicle_class: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      smoking: {
        type: DataTypes.ENUM("smoking", "non_smoking"),
        defaultValue: null,
      },
      drinking: {
        type: DataTypes.ENUM("drinking", "non_drinking"),
        defaultValue: null,
      },
      sport_on_regular_basis: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      hobby: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      referrer_id: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
          model: "user",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      ci: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      di: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "userAdditionalInfo",
      tableName: MASTERDB.TABLES.USER_ADDITIONAL_INFO_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return userAdditionalInfo;
};
