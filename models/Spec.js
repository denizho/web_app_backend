const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Spec = sequelize.define(
  "Spec",
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
  },
  {
    freezeTableName: true,
  }
);

module.exports = Spec;
