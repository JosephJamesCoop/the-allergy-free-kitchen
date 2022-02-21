const { Op } = require("sequelize");
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote, Allergy } = require("../models");

const catchError = (err) => { console.log(err); res.status(500).json(err); }

router.get("/:allergy", (req, res) => {
  Recipe.findAll({
    where: {
      [Op.not]: {[req.params.allergy]: 1}
    },
    attributes: [ 
      "id", 
      "name", 
      "description", 
      "instructions", 
      "ingredients", 
      "user_id", 
      [ sequelize.literal( "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)" ), "vote_count" ]
    ],
    include: [ 
      { model: User,    attributes: ["username"] }, 
      { model: Allergy, as: "allergies" } 
    ]
  })
    .then(async (dbRecipeData) => { 
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      res.render("homepage", { 
        recipes, 
        loggedIn: req.session.loggedIn, 
        name: req.session.username 
      });
    })
    .catch(catchError);
});

module.exports = router;