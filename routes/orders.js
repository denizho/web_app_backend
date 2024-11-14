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
  const { name, predpr_id } = req.body;
  try {
    const newOrder = await Order.create({ name, predpr_id });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании заказа" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, predpr_id } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      order.name = name;
      order.predpr_id = predpr_id;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении заказа" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.status(204).send(); // Успешное удаление
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении заказа" });
  }
});

module.exports = router;
