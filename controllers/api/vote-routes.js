const router = require('express').Router();
const { Post, User, Vote, Recipe } = require('../../models');
const sequelize = require('../../config/connection');
const { response } = require('express');
const error500 = err => {
  console.log(err);
  res.status(500).json(err);
};

// insomnia test PUT /api/posts/upvote
router.put('/vote', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { UpVote, 
      // Comment, 
      User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(error500);
  }
});

// // insomnia test PUT /api/posts/downvote
// router.put('/downvote', (req, res) => {
//   // make sure the session exists first
//   if (req.session) {
//     // pass session id along with all destructured properties on req.body
//     Post.downvote({ ...req.body, user_id: req.session.user_id }, { DownVote, 
//       // Comment, 
//       User })
//       .then(updatedVoteData => res.json(updatedVoteData))
//       .catch(error500);
//   }
// });

// /api/votes/:id
router.post('/:id', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const recipe = await Recipe.findByPk(req.params.id, {
        include: User
      })

      const {count} = await Vote.findAndCountAll({
        where: {
          user_id: recipe.user.id, 
          recipe_id: req.params.id
        }
      })
      if(count == 0) {
        await Vote.create({
          user_id: recipe.user.id, 
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