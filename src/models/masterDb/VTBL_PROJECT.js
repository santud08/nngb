import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";
export default (sequelize, DataTypes) => {
  class VTBL_PROJECT extends Model {
    static associate() {}
  }
  VTBL_PROJECT.init(
    {
      PROJECT_CODE: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      PJT_TITLE: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      PJT_ITEM: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      PJT_TYPE: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      PJT_FORMTYPE: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      PJT_FORMOF: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      PJT_TERMOF_START: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJT_TERMOF_END: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJT_REPORT_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJT_CURRENCY: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      PJT_CURRENCY_VALUE: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PJT_OFSUPPLY: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PJT_OFVAT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PJT_COMPANY: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      PJT_TEAM: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      PJT_CHARACTER: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_RANGE: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_AREA: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CITEM: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_FIELD: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CCODE: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      PJT_CO_NAME: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_NUMBER: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      PJT_CO_CNAME: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CTEAM: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CGRADE: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CMOBILE: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CPHONE: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJT_CO_CEMAIL: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJTM_CCODE: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      PJTM_OFSUPPLY: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PJTM_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJTM_DATE_END: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJTM_TERMOF_START: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJTM_TERMOF_END: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PJTM_SAMPLE: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      PJTM_CAUTION: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      PJTM_STATUS: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      PJTM_TEAM: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      PJTM_METHOD: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      PJTM_BOOKS_PLAN: {
        type: DataTypes.DECIMAL(32, 0),
        defaultValue: null,
      },
      PJTM_BOOKS_USED: {
        type: DataTypes.DECIMAL(32, 0),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "VTBL_PROJECT",
      tableName: MASTERDB.TABLES.VTBL_PROJECT,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return VTBL_PROJECT;
};
