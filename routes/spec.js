const express = require("express");
const { Spec } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const specs = await Spec.findAll();
    res.json(specs);
  } catch (error) {
    console.error("Ошибка при получении спецификаций:", error);
    res.status(500).json({
      error: "Ошибка при получении спецификаций",
      details: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const spec = await Spec.findByPk(id);
    if (spec) {
      res.json(spec);
    } else {
      res.status(404).json({ error: "Спецификация не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении спецификации" });
  }
});

router.post("/", async (req, res) => {
  const { prod_id, kol } = req.body;
  try {
    const newSpec = await Spec.create({ prod_id, kol });
    res.status(201).json(newSpec);
  } catch (error) {
    console.error("Ошибка при создании спецификации:", error);
    res.status(500).json({
      error: "Ошибка при создании спецификации",
      details: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { prod_id, kol } = req.body;
  try {
    const spec = await Spec.findByPk(id);
    if (spec) {
      spec.prod_id = prod_id;
      spec.kol = kol;

      await spec.save();
      res.json(spec);
    } else {
      res.status(404).json({ error: "Спецификация не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении спецификации" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const spec = await Spec.findByPk(id);
    if (spec) {
      await spec.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Спецификация не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении спецификации" });
  }
});

module.exports = router;
