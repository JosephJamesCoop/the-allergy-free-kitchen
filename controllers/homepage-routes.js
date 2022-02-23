const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote, Allergy } = require("../models");

router.get("/", (req, res) => {
  Recipe.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "instructions",
      "ingredients",
      "user_id",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Allergy, 
        as: 'allergies'
      }
    ],
  })
    .then(async (dbRecipeData) => {
      // pass a single recipe object into the homepage template
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      res.render("homepage", { recipes, loggedIn: req.session.loggedIn, name: req.session.username });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signUp', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signUp');
});

router.get("/add-recipe", (req, res) => {

  res.render("add-recipe", {
    loggedIn: req.session.loggedIn,
  });
})

module.exports = router;