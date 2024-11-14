const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categ = sequelize.define(
  "Categ",
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
  },
  {
    freezeTableName: true,
  }
);
module.exports = Categ;
