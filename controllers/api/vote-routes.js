const router = require('express').Router();
const { Post, User, UpVote, DownVote, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const error500 = err => {
  console.log(err);
  res.status(500).json(err);
};

// insomnia test PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
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

// insomnia test PUT /api/posts/downvote
router.put('/downvote', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.downvote({ ...req.body, user_id: req.session.user_id }, { DownVote, 
      // Comment, 
      User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(error500);
  }
});

module.exports = router;