const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote, Allergy } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Recipe.findAll({
    where: {
      user_id: req.session.user_id
    },
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
      res.render("userprofile", { recipes, loggedIn: true, name: req.session.username });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/recipe-profile', (req, res) => {
  if (req.session.loggedIn) {
    res.render('recipe-profile');
    return;
  }
  res.redirect('/');
});

module.exports = router;