const router = require('express').Router();
const { User, Recipe, Vote } = require('../../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };



// insomnia test GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Recipe,
        attributes: ['id', 'name', 'description', 'ingredients', 'steps', 'user_id'
        // , 'photo' 
      ]
      },
      {
        model: Recipe,
        attributes: ['name'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json(message400);
        return;
      }
      res.json(dbUserData);
    })
    .catch(error505);
});

module.exports = router;