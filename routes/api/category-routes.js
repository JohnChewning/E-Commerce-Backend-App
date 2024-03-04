const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!categoryData || categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one category by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!categoryData) {
      return res.status(404).json({ message: 'No category found with this id' });
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a category by id
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (!categoryData[0]) {
      return res.status(404).json({ message: 'No category found with this id' });
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      return res.status(404).json({ message: 'No category found with that id' });
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
