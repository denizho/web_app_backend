const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("webapi", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
