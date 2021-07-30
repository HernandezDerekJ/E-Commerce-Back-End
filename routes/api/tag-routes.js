const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagGet = await Tag.findAll({include: [{ model: Product }]});
    res.status(200).json(tagGet);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagGetID = await Tag.findAll({include: [{ model: Product }],      
      where: {
      id: req.params.id,
    }});
    res.status(200).json(tagGetID);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const putTag = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(putTag);
    res.status(200).json(putTag);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // SQL: DELETE FROM ecommerce_db.tag WHERE id = ?
    try {
      const deleted = Tag.destroy({
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
