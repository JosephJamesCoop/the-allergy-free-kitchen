const router = require('express').Router();

const homepageRoutes = require('./homepage-routes');

router.use('/', homepageRoutes);

module.exports = router;
