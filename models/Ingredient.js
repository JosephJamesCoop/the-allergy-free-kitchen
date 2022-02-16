// This model will link Allergy with Recipe and User with Allergy so that users can filter for recipes that avoid their specific allergy.\

const { get } = require("http");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {
  static async addIngredient(body, models) {
    try {
      return await Ingredient.create({
        name: body.name,
        description: body.description,
        ingredients: body.ingredients,
      });
    } catch (err) {
      return err;
    }
  }
}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(name) {
      return name[0].toUpperCase() + string.slice(1);
    },
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
