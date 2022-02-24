const router = require('express').Router();
const { User, Recipe, Vote } = require('../../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };


router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(error505);
});

module.exports = router;