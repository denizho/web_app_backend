const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prod = sequelize.define(
  "Prod",
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categ_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categ",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Prod;
