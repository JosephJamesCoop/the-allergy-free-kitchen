const router = require("express").Router();
const { Recipe, User, Vote, Allergy } = require("../models");

router.get("/:allergy", async (req, res) => {
  try {
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
  } catch(err) {
    console.log(err); 
    res.status(500).json(err);
  }
});

module.exports = router;