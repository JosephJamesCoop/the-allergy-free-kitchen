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
    through: 'RecipeAllergies',
    as: 'recipe_allergy',
});

Allergy.belongsToMany(Recipe, {
    through: 'RecipeAllergies',
    as: 'recipe_allergy',
});

// User to Recipe is many:many
Recipe.belongsToMany(User, {
    through: Vote,
    as: 'voted_recipes',
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Recipe, {
    through: Vote,
    as: 'voted_recipes',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});


