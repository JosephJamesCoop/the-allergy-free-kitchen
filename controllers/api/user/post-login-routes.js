const router = require('express').Router();
const { User, Recipe, Vote, Comment } = require('../../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };



router.post('/login', (req, res) => {
  // testing {"test-name@testing.com", "password": "Passwprd1234"}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json(message400);
      return;
    }
    // verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

module.exports = router;