const router = require('express').Router();
const { Recipe, User, Vote, Allergy } = require('../../models');
const sequelize = require('../../config/connection');



// insomnia test GET /
router.get('/', (req, res) => {
  Recipe.findAll({
    attributes: [
      'id', 'name', 'description', 'instructions', 'ingredients', 'ingredientsClean', 'user_id',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Allergy,
        as: 'allergies',
        attributes: ['name', 'ingredients']
      }
    ]
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//insomnia test GET/recipe/1
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 'name', 'description', 'instructions', 'ingredients', 'user_id',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Allergy,
        as: 'allergies',
        attributes: ['name', 'ingredients']
      }
    ]
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//insomnia test POST /
router.post('/', (req, res) => {
  // insomnia testing {"name": "chicken", "description": "Yummy baked chicken", "instructions": "step 1. preheat oven, step 2. sprinkle with salt and pepper, step 3. bake the chicken", "ingredients": "chicken, salt, pepper", "user_id": "1"}
  Recipe.create({
    name: req.body.name,
    description: req.body.description,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    user_id: req.body.user_id
    // photo: req.body.photo
  })
  .then(dbRecipeData => res.json(dbRecipeData))
  .catch(err => {
    console.log("============================================= finding my error =========================", err);
    res.status(500).json(err);
  });
});

// insomnia test route PUT /api/users/1
router.put('/:id', (req, res) => {
  // insomnia testing {"description": "Yummy baked chicken", "ingredients": "chicken, salt, pepper, shake 'n bake",}
  Recipe.update(
    {
      name: req.body.name
    },
    {
    where: {
      id: req.params.id
    }
  }
  )
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No Recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No Recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;