const express = require("express");
const { Categ } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Categ.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении категорий" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Categ.findByPk(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Категория не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении категории" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Categ.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании категории" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Categ.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ error: "Категория не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении категории" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Categ.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Категория не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении категории" });
  }
});

module.exports = router;
