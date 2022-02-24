const router = require('express').Router();
const { User, Recipe, Vote, Allergy} = require('../../../models');
const sequelize = require('../../../config/connection');

// insomnia test GET /
router.get('/', (req, res) => {
  Recipe.findAll({
    attributes: [
      'id', 'name', 'description', 'instructions', 'ingredients', 'ingredientsClean', 'dairy', 'soy', 'nuts', 'celiac', 'shellfish', 'vegetarian', 'user_id',
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

module.exports = router;