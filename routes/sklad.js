const express = require("express");
const { Sklad } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sklads = await Sklad.findAll();
    res.json(sklads);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении складов" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sklad = await Sklad.findByPk(id);
    if (sklad) {
      res.json(sklad);
    } else {
      res.status(404).json({ error: "Склад не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении склада" });
  }
});

router.post("/", async (req, res) => {
  const { prod_id, kol, date_in } = req.body;
  try {
    const newSklad = await Sklad.create({ prod_id, kol, date_in });
    res.status(201).json(newSklad);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании склада" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { prod_id, kol, date_in } = req.body;
  try {
    const sklad = await Sklad.findByPk(id);
    if (sklad) {
      sklad.prod_id = prod_id;
      sklad.kol = kol;
      sklad.date_in = date_in;
      await sklad.save();
      res.json(sklad);
    } else {
      res.status(404).json({ error: "Склад не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении склада" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sklad = await Sklad.findByPk(id);
    if (sklad) {
      await sklad.destroy();
      res.status(204).send(); // Успешное удаление
    } else {
      res.status(404).json({ error: "Склад не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении склада" });
  }
});

module.exports = router;
