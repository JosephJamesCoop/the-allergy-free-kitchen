// This model will link Allergy with Recipe and User with Allergy so that users can filter for recipes that avoid their specific allergy.\

const { get } = require("http");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  allergy_id: {
    type: DataTypes.INTEGER,
    references: {
        model: "allergy",
        key: "id"
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'recipe',
        key: 'id'
    }
  },
});
