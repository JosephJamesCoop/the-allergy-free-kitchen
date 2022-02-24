const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Allergy } = require("../models");

router.get("/:id", (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "description",
      "instructions",
      "ingredients",
      "ingredientsClean",
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
        as: 'allergies',
        attributes: ["id", "name", "description", "ingredients"]
      }
    ]
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No Recipe found with this id" });
        return;
      }

      const recipe = dbRecipeData.get({ plain: true });
      res.render("recipe-profile", {
        recipe,
        loggedIn: req.session.loggedIn,
        name: recipe.user.username
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;