const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product,
        through: ProductTag,
      }] 
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{
        model: ProductData,
        through: ProductTagData,
      }],
    });
    if (!tagData) {
      res.status(404).json({message:'No tag found with that id'})
      return
    }
    res.status(200).json(Tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create ({
    id: req.body.id,
    name: req.body.tag_name,
  })
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err)=>{
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedTag) => {
    console.log(updatedTag);
    if (!updatedTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.json(updatedTag)
  })
  .catch((err)=>{
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }
  )
  .then((deletedTag) => 
  res.json(deletedTag)
  ).catch((err) =>{ 
  console.log(err);
  res.json(err)
})
});

module.exports = router;
