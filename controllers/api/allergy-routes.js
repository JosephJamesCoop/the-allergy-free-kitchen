const router = require('express').Router();
const { Recipe, User, UPVote, DownVote, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const error500 = err => {
  console.log(err);
  res.status(500).json(err);
};
const attributes = [
  'id', 'name', 'description', 'ingredients', 'steps', 'user_id', "allergy_id"
  // , 'photo' 
  [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Recipe.id = upvote.Recipe_id)'), 'upvote_count'],
  [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Recipe.id = downvote.Recipe_id)'), 'downvote_count']
];
const include = [
  // {
  //   model: Comment,
  //   attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
  //   include: {
  //     model: User,
  //     attributes: ['username']
  //   }
  // },
  {
    model: User,
    attributes: ['username']
  }
]

// insomnia test GET /
router.get('/', (req, res) => {
  Recipe.findAll(
    { if (req.body.allergy_id = 1) {
    attributes: attributes,
    order: [['upvote_count', 'ASC']],
    include: include,
    }})
    .then(dbRecipeData => if (dbRecipeData.allergy_id = )
      
      res.json(dbRecipeData))
    .catch(error500);
});

//insomnia test GET/recipe/1
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: attributes,
    order: [['upvote_count', 'ASC']],
    include: include
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No Recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(error500);
});

//insomnia test POST /
router.post('/', (req, res) => {
  // insomnia testing {"id": "1", "name": "chicken", "description": "Yummy baked chicken", "ingredients": "chicken, salt, pepper", "steps": "step 1. preheat oven, step 2. sprinkle with salt and pepper, step 3. bake the chicken", "user_id": "1", "allergy_id:": 1,3}
  Recipe.create({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    user_id: req.body.user_id,
    allergy_id: req.body.allergy_id
    // photo: req.body.photo
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(error500);
});

// insomnia test route PUT /api/users/1
router.put('/:id', (req, res) => {
  // insomnia testing {"description": "Yummy baked chicken", "ingredients": "chicken, salt, pepper, shake 'n bake",}
  Recipe.update(req.body, {
    individualHooks: true,
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
    .catch(error500);
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
    .catch(error500);
});

module.exports = router;