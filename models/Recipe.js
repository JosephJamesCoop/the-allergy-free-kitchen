// This model will be populated with recipes (recipes that users make) and will be connected with the Allergy model.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const inflection = require("inflection")

// the recipe model extends the sequelize model 
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
    },
    get() {
      const rawValue = this.getDataValue('instructions');
      let instructionsArr = rawValue.split(/[^A-Za-z ]/);
      let cleanInstructionsArr = instructionsArr.filter((instruction) => {
        if (instruction === "") {
          return false;
        }
        return instruction.trim();
      });
      return cleanInstructionsArr;
    },
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
  dairy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nuts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  celiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shellfish: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vegetarian: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.STRING,
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