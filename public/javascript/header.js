
const name = 

<a href="/userprofile" class="navbar-brand">Welcome to </a>



const router = require("express").Router();
const sequelize = require("../config/connection");
const {User} = require("../models");
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  User.findAll({
    where: {
      id: req.session.id
    },
    attributes: [
      "username",
    ],
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