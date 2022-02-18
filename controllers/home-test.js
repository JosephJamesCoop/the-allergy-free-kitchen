const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Vote } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
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
    ],
  })
    .then((dbRecipeData) => {
      // pass a single recipe object into the homepage template
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      res.render("homepage", { recipes, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/', (req, res) => {
//     res.render('homepage', {
//         recipes: [
//             {
//                 name: 'fried chicken',
//                 icons: ['dairy', 'shellfish'],
//                 description: 'yum yum delish fried chicken'
//             }, 
//             {
//                 name: 'shrimp tacos',
//                 icons: ['soy'],
//                 description: 'boy howdy dems are some good shrimp tacos'
//             }
//         ]
//     })
// })

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

module.exports = router;