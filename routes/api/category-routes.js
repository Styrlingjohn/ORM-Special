const router = require('express').Router();
const { INTEGER } = require('sequelize');
const { Category, Product, } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create ({
    category_name: req.body.category_name,
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err)=>{
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update category data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    console.log(updatedCategory);
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.json(updatedCategory)
  })
  .catch((err)=>{
    console.log(err);
    res.json(err);
  });
  
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    },
  }
  )
  .then((deletedCategory) => 
  res.json(deletedCategory)
  ).catch((err) =>{ 
  console.log(err);
  res.json(err)
})
});

module.exports = router;
