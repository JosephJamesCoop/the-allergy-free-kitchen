const router = require('express').Router();
const { Recipe, User, UPVote, DownVote, Comment } = require('../../models');
const sequelize = require('../../config/connection');



module.exports = router;