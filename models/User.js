// This model will be populated with the app's users and will be connected with The Recipe, Vote and Allergy models.
const { Model, Datatypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const Recipe = require('../models/Recipe');
const Vote = require('../models/Vote');
const Allergy = require('../models/Allergy');

class User extends Model {}

User.init
// User is connected with Allergy so that each user can list their allergies and be recommended recipes by the site that don't contain their allergens.