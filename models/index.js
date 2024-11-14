const sequelize = require("../config/database");
const Categ = require("./Categ");
const Predpr = require("./Predpr");
const Prod = require("./Prod");
const Order = require("./Order");
const Sklad = require("./Sklad");
const Spec = require("./Spec");

Categ.hasMany(Prod, { foreignKey: "categ_id" });
Prod.belongsTo(Categ, { foreignKey: "categ_id" });

Predpr.hasMany(Order, { foreignKey: "predpr_id" });
Order.belongsTo(Predpr, { foreignKey: "predpr_id" });

Order.hasMany(Spec, { foreignKey: "order_id" });
Spec.belongsTo(Order, { foreignKey: "order_id" });

Prod.hasMany(Spec, { foreignKey: "prod_id" });
Spec.belongsTo(Prod, { foreignKey: "prod_id" });

Prod.hasMany(Sklad, { foreignKey: "prod_id" });
Sklad.belongsTo(Prod, { foreignKey: "prod_id" });

module.exports = { sequelize, Categ, Order, Predpr, Prod, Sklad, Spec };
