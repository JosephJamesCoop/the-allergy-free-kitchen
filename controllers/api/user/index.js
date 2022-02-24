const router = require('express').Router();

const deleteRoutes = require('./delete-routes');
const getFindAllRoutes = require('./get-findAll-routes');
const getFindOneRoutes = require('./get-findOne-routes');
const postCreateRoutes = require('./post-create-routes');
const postLoginRoutes = require('./post-login-routes');
const postLogoutRoutes = require('./post-logout-routes');
const putUpdateRoutes = require('./put-update-routes');

router.use('/', deleteRoutes);
router.use('/', getFindAllRoutes);
router.use('/', getFindOneRoutes);
router.use('/', postCreateRoutes);
router.use('/', postLoginRoutes);
router.use('/', postLogoutRoutes);
router.use('/', putUpdateRoutes);

module.exports = router;