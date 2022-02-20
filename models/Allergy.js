// This model is populated with all filterable allergies and is connected with the Recipe and Ingredient models

const { Model, DataTypes, VIRTUAL } = require("sequelize");
const sequelize = require("../config/connection");

class Allergy extends Model {
  static async addAllergy(body, models) {
    try {
      return await Allergy.create({
        name: body.name,
        description: body.description,
        ingredients: body.ingredients,
      });
    } catch (err) {
      return err;
    }
  }
}

Allergy.init({
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
      this.setDataValue('name', name[0].toUpperCase() + name.slice(1))
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
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
},
{
  sequelize,
  freezeTableName: true,
  timestamps: false,
  underscored: true,
  modelName: 'allergy'
}
);

module.exports = Allergy;
