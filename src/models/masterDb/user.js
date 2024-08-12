import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      emailTemplate,
      userAdditionalInfo,
      userHomeAppliances,
      companySettings,
      subpanelUserJoined,
      bankList,
      inquiry,
      bannerClickCount,
      eTicketOrder,
    }) {
      // define association here
      this.hasOne(companySettings, {
        //as: "emailTemplate",
        foreignKey: "created_by",
        constraints: true,
      });
      this.hasMany(emailTemplate, {
        //as: "emailTemplate",
        foreignKey: "created_by",
        constraints: true,
      });
      this.hasMany(userHomeAppliances, {
        //as: "emailTemplate",
        foreignKey: "user_id",
        constraints: true,
      });
      this.hasOne(userAdditionalInfo, { foreignKey: "user_id" });
      this.hasMany(subpanelUserJoined, { foreignKey: "user_id" });
      this.hasOne(bankList, {
        foreignKey: "bank_code",
        sourceKey: "bank_code",
        constraints: true,
      });
      this.hasMany(inquiry, {
        foreignKey: "updated_by",
        constraints: true,
      });
      this.hasMany(bannerClickCount, {
        foreignKey: "updated_by",
        constraints: true,
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: DataTypes.STRING,
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      // profile_image: DataTypes.STRING,
      user_type: DataTypes.ENUM("user", "admin", "super_admin"),
      gender: DataTypes.ENUM("male", "female"),
      dob: DataTypes.DATE,
      additional_address: DataTypes.STRING,
      nationality: DataTypes.ENUM("local", "foreigner"),
      mobile_carrier: DataTypes.ENUM(
        "kt",
        "lg",
        "lgt",
        "skt",
        "kt_affordable_phone",
        "lg_affordable_phone",
        "skt_affordable_phone",
      ),
      bank_code: DataTypes.STRING,
      bank_account_number: DataTypes.STRING,
      zip_code: DataTypes.STRING,
      address: DataTypes.TEXT,
      register_from: DataTypes.ENUM("naver", "kakao", "google"),
      acquisition_channel: DataTypes.ENUM("smart_panel", "netpoint"),
      token: DataTypes.STRING,
      email_verification: DataTypes.TINYINT,
      ip_address: DataTypes.STRING,
      email_verified_date: DataTypes.DATE,
      mobile_verification_code: DataTypes.STRING,
      email_verification_code: DataTypes.STRING,
      mobile_verified_date: DataTypes.DATE,
      withdrawal_reason: DataTypes.TEXT,
      referral_id: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "blocked", "withdrawal", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      last_activity_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user",
      tableName: MASTERDB.TABLES.USER_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return user;
};
