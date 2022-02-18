const router = require('express').Router();

const apiRoutes = require("./api");
const homepageRoutes = require('./homepage-routes');

router.use("/api", apiRoutes);
router.use('/', homepageRoutes);

module.exports = router;
