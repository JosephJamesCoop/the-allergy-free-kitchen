// import all models
const Recipe = require('./Recipe');
const Allergy = require('./Allergy');
const User = require('./User');
const Vote = require('./Vote');

// create associations

// Recipe to User is 1:many
Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

// Allergy to Recipe is many:many
Recipe.belongsToMany(Allergy, {
    as: 'recipe_allergy',
    through: 'RecipeAllergies'
});

Allergy.belongsToMany(Recipe, {
    as: 'recipe_allergy',
    through: 'RecipeAllergies'
});

// 
