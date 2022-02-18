// This model will be populated with recipes (posts that users make) and will be connected with the Allergy model.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const inflection = require("inflection")

class Recipe extends Model {
  static async addRecipe(body, models) {
    try {
      return await Recipe.create({
        name: body.name,
        description: body.description,
        instructions: body.instructions,
        ingredients: body.ingredients,
        user_id: body.user_id
      });
    } catch (err) {
      return err;
    }
  }
}

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [6],
    }
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3],
    },
    get() {
      const rawValue = this.getDataValue('ingredients');
      let alphaOnlyIngredients = rawValue.replace(/[0-9]/g, "");
      let alphaIngredientArr = alphaOnlyIngredients.split(/[^A-Za-z ]/);
      let pluralIngredientsArr = alphaIngredientArr.map((ingredientInfo) => {
        return ingredientInfo.split(' ').splice(-1).join('');
      });
      let ingredientsArr = pluralIngredientsArr.map((pluralIngredient) => {
        return inflection.singularize(pluralIngredient);
      });
      return ingredientsArr;
    },
  },
  ingredientsClean: {
    type: DataTypes.VIRTUAL,
    get() {
      const rawValue = this.getDataValue('ingredients');
      let alphaOnlyIngredients = rawValue.replace(/[0-9]/g, "");
      let alphaIngredientArr = alphaOnlyIngredients.split(/[^A-Za-z ]/)
      let pluralIngredientsArr = alphaIngredientArr.map((ingredientInfo) => {
        return ingredientInfo[ingredientInfo.length - 1].trim()
      });
      return pluralIngredientsArr.map((ingredient) => {
        inflection.singularize(ingredient);
      });
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'recipe'
}
);

module.exports = Recipe;
