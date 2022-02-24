const router = require('express').Router();


const recipeRoutes = require('./recipe');
const userRoutes = require('./user');
const voteRoutes = require('./vote-routes');
// const commentRoutes = require('./comment-routes');


router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/votes', voteRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;