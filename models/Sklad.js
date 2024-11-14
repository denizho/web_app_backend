const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sklad = sequelize.define(
  "Sklad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prod_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Prod",
        key: "id",
      },
    },
    kol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Sklad;
