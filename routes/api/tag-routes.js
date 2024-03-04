const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one tag by id with associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!tagData) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a tag's name by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if (!tagData[0]) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({ where: { id: req.params.id } });

    if (!tagData) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
