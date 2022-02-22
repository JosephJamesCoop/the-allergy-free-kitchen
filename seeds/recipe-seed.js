const { Recipe } = require('../models');

const recipedata = [ 
    {
    name: "shrimp tacos",
    description: "delish shrimp tacos",
    instructions: "1.season shrimp and fry 2. add toppings",
    ingredients: "shrimp, tortillas, lime, avocado, cabbage, cilantro",
    user_id: 1,
},
{
    name: "tofu scramble",
    description: "delish tofu scramble",
    instructions: "1.drain and press tofu 2.crumble tofu and season 3. scramble in a pan and add veggies",
    ingredients: "tofu, onions, spinach, peppers",
    user_id: 1,
},
{
    name: "peanut butter",
    description: "delish homemade peanut butter",
    instructions: "1.grind peanuts in food processor until smooth 2.add salt to taste",
    ingredients: "peanuts, salt",
    user_id: 1,
},
{
    name: "feta dip",
    description: "delish feta dip",
    instructions: "1.combine feta, olive oil, and herbs 2.stir",
    ingredients: "feta, olive oil, basil, thyme",
    user_id: 1,
},
{
    name: "fried chicken",
    description: "delish fried chicken",
    instructions: "1.dredge chicken in buttermilk, then flour 2. fry",
    ingredients: "chicken, buttermilk, flour",
    user_id: 1,
}
];

const seedRecipe = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipe;