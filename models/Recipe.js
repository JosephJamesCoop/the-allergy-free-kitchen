// This model will be populated with recipes (posts that users make) and will be connected with both the Ingredient and Allergy models.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

