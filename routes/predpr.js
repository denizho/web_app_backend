const express = require("express");
const { Predpr } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const predprs = await Predpr.findAll();
    res.json(predprs);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const predpr = await Predpr.findByPk(id);
    if (predpr) {
      res.json(predpr);
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заказа" });
  }
});

router.post("/", async (req, res) => {
  const { name, address } = req.body;
  try {
    const newPredpr = await Predpr.create({ name, address });
    res.status(201).json(newPredpr);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании заказа" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const predpr = await Predpr.findByPk(id);
    if (predpr) {
      predpr.name = name;
      predpr.address = address;
      await predpr.save();
      res.json(predpr);
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
    const predpr = await Predpr.findByPk(id);
    if (predpr) {
      await predpr.destroy();
      res.status(204).send(); // Успешное удаление
    } else {
      res.status(404).json({ error: "Заказ не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении заказа" });
  }
});

module.exports = router;
