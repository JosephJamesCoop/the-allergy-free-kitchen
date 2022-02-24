const router = require('express').Router();
const { User, Recipe, Vote } = require('../../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };



// insomnia test route POST /api/users
router.post('/', (req, res) => {
  // insomnia testing {"id": "1", "username": "Test-Name", "first_name": "Test", "last_name": "Name", "email": "test-name@testing.com", "password": "Passwprd1234", "allergies": "nuts", "recipe_id": "1"}
  User.create({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    allergies: req.body.allergies,
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
  })
});

module.exports = router;