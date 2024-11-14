const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const categoriesRouter = require("./routes/categories");
const ordersRouter = require("./routes/orders");
const prodRouter = require("./routes/prod");
const skladRouter = require("./routes/sklad");
const specRouter = require("./routes/spec");
const predprRouter = require("./routes/predpr");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
