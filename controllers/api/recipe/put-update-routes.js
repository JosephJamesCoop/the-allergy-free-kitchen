const router = require('express').Router();
const { User, Recipe, Vote, Comment } = require('../../../models');


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

module.exports = router;