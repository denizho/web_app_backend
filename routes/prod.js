const express = require("express");
const { Prod } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { categ_id } = req.query;
    let products;

    if (categ_id) {
      products = await Prod.findAll({ where: { categ_id } });
    } else {
      products = await Prod.findAll();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении продуктов" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Prod.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Продукт не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении продукта" });
  }
});

router.post("/", async (req, res) => {
  const { name, price, categ_id } = req.body;
  try {
    const newProduct = await Prod.create({ name, price, categ_id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании продукта" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, categ_id } = req.body;
  try {
    const product = await Prod.findByPk(id);
    if (product) {
      product.name = name;
      product.price = price;
      product.categ_id = categ_id;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: "Продукт не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении продукта" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Prod.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Продукт не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении продукта" });
  }
});

module.exports = router;
