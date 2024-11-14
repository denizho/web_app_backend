const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    predpr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Predpr",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Order;
