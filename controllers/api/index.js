const router = require('express').Router();

// const allergyRoutes = require('./allergy-routes');
const recipeRoutes = require('./recipe-routes');
const userRoutes = require('./user-routes');
const voteRoutes = require('./vote-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/allergies', allergyRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/votes', voteRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;