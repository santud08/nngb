import { Model } from "sequelize";
import { MASTERDB } from "../../utils/constants.js";

export default (sequelize, DataTypes) => {
  class event extends Model {
    static associate({ user, eventCategory }) {
      this.belongsTo(user, { foreignKey: "created_by" });
      this.belongsTo(user, { foreignKey: "updated_by" });
    }
  }

  event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      event_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      event_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      event_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      event_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      event_image_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      event_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      panel: DataTypes.ENUM("smart_panel", "netpoint"),
      points: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      event_method: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "event",
      tableName: MASTERDB.TABLES.EVENT_TABLE,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );

  return event;
};
