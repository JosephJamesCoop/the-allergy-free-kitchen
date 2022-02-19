const router = require("express").Router();
const { Recipe, User, Allergy, Vote } = require("../models");
const sequelize = require("../../config/connection");

router.get("recipe/:id", (req, res) => {
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
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    include: [
      {
        model: Allergy,
        attributes: ["id", "name", "description", "ingredients"],
      },
    ],
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
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
