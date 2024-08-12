import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class adminUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({
      userMenu,
      inquiry,
      departments,
      bu,
      team,
      headquarter,
      business,
      customerBusiness,
      customer,
      bannerClickCount,
      banner,
    }) {
      // define association here
      this.hasMany(userMenu, {
        foreignKey: "user_id",
        constraints: true,
      });

      this.hasMany(inquiry, {
        foreignKey: "updated_by",
        constraints: true,
      });

      this.hasOne(departments, {
        foreignKey: "id",
        sourceKey: "department_id",
        constraints: true,
      });

      this.hasOne(bu, {
        foreignKey: "id",
        sourceKey: "bu_id",
        constraints: true,
      });

      this.hasOne(team, {
        foreignKey: "id",
        sourceKey: "team_id",
        constraints: true,
      });

      this.hasOne(headquarter, {
        foreignKey: "id",
        sourceKey: "headquarter_id",
        constraints: true,
      });

      this.hasMany(customerBusiness, {
        foreignKey: "created_by",
        constraints: true,
      });

      this.hasMany(customerBusiness, {
        foreignKey: "updated_by",
        constraints: true,
      });
      this.hasMany(business, {
        foreignKey: "created_by",
        constraints: true,
      });
      this.hasMany(business, {
        foreignKey: "updated_by",
        constraints: true,
      });

      this.hasMany(customer, {
        foreignKey: "created_by",
        constraints: true,
      });

      this.hasMany(customer, {
        foreignKey: "updated_by",
        constraints: true,
      });

      this.hasMany(banner, {
        foreignKey: "created_by",
        constraints: true,
      });
      this.hasMany(banner, {
        foreignKey: "updated_by",
        constraints: true,
      });
      this.hasMany(bannerClickCount, {
        foreignKey: "created_by",
        constraints: true,
      });
    }
  }

  adminUsers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      passwd: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      phone: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      mobile: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      company: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      auth: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      login_yn: {
        type: DataTypes.ENUM("Y", "N"),
        allowNull: false,
        defaultValue: "N",
      },
      user_type: {
        type: DataTypes.ENUM("super_admin", "manager", "vendor"),
        allowNull: false,
        defaultValue: "manager",
      },
      check_ip: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      login_fail_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      reg_day: {
        type: DataTypes.DATE,
        allowNull: false,
        //defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      business_ids: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      department_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      bu_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      headquarter_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      team_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      rank: DataTypes.STRING,
      user_name: DataTypes.STRING,
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
      modelName: "adminUsers",
      tableName: MASTERDB.TABLES.ADMIN_USER_TABLE,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return adminUsers;
};
