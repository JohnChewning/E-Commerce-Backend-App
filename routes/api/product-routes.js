const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, attributes: ['tag_name'] }
      ]
    });

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one product by id with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, attributes: ['tag_name'] }
      ]
    });

    if (!productData) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a product by id
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    
    const newProductTags = req.body.tagIds
      .filter(tag_id => !productTagIds.includes(tag_id))
      .map(tag_id => ({ product_id: req.params.id, tag_id }));
   
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({ where: { id: req.params.id } });

    if (!productData) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
