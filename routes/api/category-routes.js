const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  // SQL: SELECT * FROM ecommerce_db.category, ecommerce_db.product WHERE product.category_id = category.id
  try {
    const categories = await Category.findAll({include: [{ model: Product }]});
    res.status(200).json(categories);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //SQL: SELECT * FROM ecommerce_db.category WHERE product.category_id = ?
  try {
    const findCat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    console.log(findCat);

    if (!findCat) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(findCat);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  //SQL: INSERT INTO ecommerce_db.category SET ?
  try {
    const newUser = await Category.create(req.body);
    res.status(200).json(newUser);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //SQL : INSERT INTO ecommerce_db.category SET ? WHERE category.id = ? 
  try {
    const updateCat = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateCat);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // SQL: DELETE FROM ecommerce_db.category WHERE id = ?
  try {
    const deleted = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deleted);
    }
    catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
