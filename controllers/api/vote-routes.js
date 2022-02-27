const router = require('express').Router();
const { Post, User, Vote, Recipe } = require('../../models');
const sequelize = require('../../config/connection');
const { response } = require('express');
const error500 = err => {
  console.log(err);
  res.status(500).json(err);
};

// /api/votes/:id
router.post('/:id', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const { count } = await Vote.findAndCountAll({
        where: {
          recipe_id: req.params.id, 
          user_id: req.session.user_id
        }
      })
      if (count == 0) {
        await Vote.create({
          user_id: req.session.user_id,
          recipe_id: req.params.id
        })
      }
      res.status(200).send()
    }
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
});

module.exports = router;