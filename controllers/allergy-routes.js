const { Op } = require("sequelize");
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote, Allergy } = require("../models");

const catchError = (err) => { console.log(err); res.status(500).json(err); }

router.get("/:allergy", async (req, res) => {

  const allergyUpper = req.params.allergy[0].toUpperCase() + req.params.allergy.slice(1)
  const allergy = await Allergy.findOne({
    where: {
      name: allergyUpper
    },
    include: [
      {
        model: Recipe,
        as: "recipes",
        attributes: [
          "id",
          "name",
          "description",
          "instructions",
          "ingredients",
          "user_id"
        ],
        include: [
          {
            model: Allergy,
            as: "allergies"
          },
          {
            model: User
          },
          {
            model: Vote,
            as: "votes"
          }
        ]
      }
    ]
  })

  const parsedRecipes = allergy.recipes.map(recipe => ({
    name: recipe.name,
    id: recipe.id,
    vote_count: recipe.votes.length,
    user: recipe.user.toJSON(),
    description: recipe.description,
    allergies: recipe.allergies.map(allergy => allergy.toJSON())
  }))
  
  res.render("homepage", {
    recipes: parsedRecipes,
    loggedIn: req.session.loggedIn,
    name: req.session.username
  });

  // Recipe.findAll({
  //   where: {
  //     [Op.not]: {[req.params.allergy]: 1}
  //   },
  //   attributes: [ 
  //     "id", 
  //     "name", 
  //     "description", 
  //     "instructions", 
  //     "ingredients", 
  //     "user_id", 
  //     [ sequelize.literal( "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)" ), "vote_count" ]
  //   ],
  //   include: [ 
  //     { model: User,    attributes: ["username"] }, 
  //     { model: Allergy, as: "allergies" } 
  //   ]
  // })
  //   .then(async (dbRecipeData) => { 
  //     const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
  //     res.render("homepage", { 
  //       recipes, 
  //       loggedIn: req.session.loggedIn, 
  //       name: req.session.username 
  //     });
  //   })
  //   .catch(catchError);
});

module.exports = router;