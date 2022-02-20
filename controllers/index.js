const router = require('express').Router();

const apiRoutes = require("./api");
const homepageRoutes = require('./homepage-routes');
const userprofileRoutes = require('./userprofile-routes');
const recipeProfileRoutes = require("./recipe-profile-routes");
const allergyRoutes = require('./allergy-routes');

router.use("/api", apiRoutes);
router.use('/', homepageRoutes);
router.use('/userprofile', userprofileRoutes);
router.use('/recipe', recipeProfileRoutes);
router.use('/allergy', allergyRoutes);

module.exports = router;


//htm routes 
// api routes