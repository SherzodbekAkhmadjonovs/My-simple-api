const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 60,
  },
});
// get categories from MongoDB to web page
const Category = mongoose.model("Category", categorySchema);
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

// find single data by id
router.get("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});

// post new element to db
router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("name is reuqired");
    return;
  }
  if (req.body.name.length < 3) {
    res.status(400).send("name should be at least 4 characters");
    return;
  }
  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();

  res.status(201).send(category);
});

// update element by id
router.put("/:id", async (req, res) => {
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});
router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});

module.exports = router;
