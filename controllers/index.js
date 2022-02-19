const router = require('express').Router();

const apiRoutes = require("./api");
const homepageRoutes = require('./homepage-routes');
const userprofileRoutes = require('./userprofile-routes');

router.use("/api", apiRoutes);
router.use('/', homepageRoutes);
router.use('/userprofile', userprofileRoutes);

module.exports = router;
