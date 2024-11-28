const express = require("express");
const { Order } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказа" });
  }
});

router.post("/", async (req, res) => {
  console.log("Полученные данные для заказа:", req.body);
  const { name, predpr_id, spec_ids, cost } = req.body;
  try {
    const newOrder = await Order.create({ name, predpr_id, spec_ids, cost });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res
      .status(500)
      .json({ error: "Ошибка при создании заказа", details: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении заказа" });
  }
});

module.exports = router;
