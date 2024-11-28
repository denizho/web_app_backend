const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");
const categoriesRouter = require("./routes/categories");
const ordersRouter = require("./routes/orders");
const prodRouter = require("./routes/prod");
const skladRouter = require("./routes/sklad");
const specRouter = require("./routes/spec");
const predprRouter = require("./routes/predpr");

const createTrigger = async () => {
  const dropTriggerQuery = `DROP TRIGGER IF EXISTS after_insert_spec;`;
  const dropTriggerQuery2 = `DROP TRIGGER IF EXISTS after_order_delete;`;

  const createTriggerQuery = ` 
  CREATE TRIGGER after_insert_spec 
  AFTER INSERT ON spec 
  FOR EACH ROW 
  BEGIN 
      UPDATE sklad 
      SET kol = kol - NEW.kol 
      WHERE prod_id = NEW.prod_id; 
  END;`;
  const createTriggerQuery2 = `  
  CREATE TRIGGER after_order_delete
  AFTER DELETE ON \`order\` 
  FOR EACH ROW 
  BEGIN
      DECLARE specArray JSON;

      SET specArray = OLD.spec_ids;

      DELETE FROM spec
      WHERE id IN (SELECT JSON_UNQUOTE(JSON_EXTRACT(value, '$')) 
                  FROM JSON_TABLE(specArray, "$[*]" COLUMNS(value VARCHAR(255) PATH "$")) AS jt);
  END;`;
  try {
    await sequelize.query(dropTriggerQuery);
    await sequelize.query(dropTriggerQuery2);
    await sequelize.query(createTriggerQuery);
    await sequelize.query(createTriggerQuery2);

    console.log("Триггер успешно создан");
  } catch (error) {
    console.error("Ошибка при создании триггера:", error);
  }
};

createTrigger();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/categories", categoriesRouter);
app.use("/orders", ordersRouter);
app.use("/prod", prodRouter);
app.use("/sklad", skladRouter);
app.use("/spec", specRouter);
app.use("/predpr", predprRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных установлено.");
    await sequelize.sync();
    console.log(`Сервер запущен на порту ${PORT}.`);
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
});
