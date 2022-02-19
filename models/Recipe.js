// This model will be populated with recipes (posts that users make) and will be connected with the Allergy model.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const inflection = require("inflection")

class Recipe extends Model {}

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

    validate: {
        len: [6],
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [6],
    }
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
      let ingredientArr = rawValue.split(/[^A-Za-z ]/);
      let cleanIngredientArr = ingredientArr.filter((ingredient) => {
        if (ingredient === "") {
          return false;
        }
        return ingredient.trim();
      });
      return cleanIngredientArr;
    },
  },
  ingredientsClean: {
    type: DataTypes.VIRTUAL,
    get() {
      const rawValue = this.getDataValue('ingredients');
      let alphaOnlyIngredients = rawValue.replace(/[0-9]/g, "");
      let alphaIngredientArr = alphaOnlyIngredients.split(/[^A-Za-z ]/);
      let pluralIngredientsArr = alphaIngredientArr.map((ingredientInfo) => {
        return ingredientInfo.split(' ').splice(-1).join('');
      });
      let ingredientsArr = pluralIngredientsArr.map((pluralIngredient) => {
        if (pluralIngredient === "") {
          return pluralIngredient === 0;
        }
        pluralIngredient.trim();
        return inflection.singularize(pluralIngredient);
      });
      return ingredientsArr;
    },
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
