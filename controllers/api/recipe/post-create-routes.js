const router = require('express').Router();
const { User, Recipe, Vote } = require('../../../models');

//insomnia test POST /
router.post('/', (req, res) => {
  // insomnia testing {"name": "chicken", "description": "Yummy baked chicken", "instructions": "step 1. preheat oven, step 2. sprinkle with salt and pepper, step 3. bake the chicken", "ingredients": "chicken, salt, pepper", "user_id": "1"}
  Recipe.create({
    name: req.body.name,
    description: req.body.description,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    dairy: req.body.dairy,
    soy: req.body.soy,
    nuts: req.body.nut,
    celiac: req.body.celiac,
    shellfish: req.body.shellfish,
    vegetarian: req.body.vegetarian,
    // user_id: req.session.user_id
    // photo: req.body.photo
  })
  .then(dbRecipeData => res.json(dbRecipeData))
  .catch(err => {
    console.log("============================================= finding my error =========================", err);
    res.status(500).json(err);
  });
});

module.exports = router;