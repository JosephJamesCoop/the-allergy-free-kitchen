const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote, Allergy } = require("../models");

const attributes = [ "id", "name", "description", "instructions", "ingredients", "user_id", 
[ sequelize.literal( "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)" ), "vote_count",],];

const include = [ { model: User, attributes: ["username"],}, {model: Allergy, as: 'allergies'} ]

const catchError = (err) => { console.log(err); res.status(500).json(err); }

router.get("/dairy", (req, res) => {
  Recipe.findAll({
    where: {
      dairy: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

router.get("/soy", (req, res) => {
  Recipe.findAll({
    where: {
      soy: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

router.get("/nuts", (req, res) => {
  Recipe.findAll({
    where: {
      nuts: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

router.get("/celiac", (req, res) => {
  Recipe.findAll({
    where: {
      celiac: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

router.get("/shellfish", (req, res) => {
  Recipe.findAll({
    where: {
      shellfish: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

router.get("/vegetarian", (req, res) => {
  Recipe.findAll({
    where: {
      vegetarian: 1
    },
    attributes: attributes,
    include: include,
  })
    .then(async (dbRecipeData) => { const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("homepage", { recipes, loggedIn: req.session.loggedIn });})
    .catch(catchError);
});

module.exports = router;