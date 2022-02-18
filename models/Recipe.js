// This model will be populated with recipes (posts that users make) and will be connected with the Allergy model.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Allergy = require("./Allergy")

class Recipe extends Model {
  // static async addRecipe(body, models) {
  //   try {
  //     return await Recipe.create({
  //       name: body.name,
  //       description: body.description,
  //       ingredients: body.ingredients,
  //     });
  //   } catch (err) {
  //     return err;
  //   }
  // }
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
    validate: {
        len: [6],
    }
  },

//  saved to copy info
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     set(name) {
//       return name[0].toUpperCase() + string.slice(1);
//     },
//   },

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
    //saved to copy info
  //   get(ingredientString) {
  //     return ingredientString.split(/[^A-Za-z ]/).map((ingredient) => {
  //       return ingredient.trim();
  //     });
  //   },
  // },
  // ingredientsClean: {
  //   type: DataTypes.VIRTUAL,
  //   get() {
  //     let cleanIngredients = this.ingredients.replace(/[0-9]/g, "");
  //     return cleanIngredients.split(/[^A-Za-z ]/).map((ingredient) => {
  //       return ingredient.trim();
  //     });
  //   },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'recipe'
}
);

module.exports = Recipe;
