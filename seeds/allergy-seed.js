const { Allergy } = require('../models');

const allergydata = [
{
    name: "Dairy", 
    description: "derived from milk", 
    ingredients: "milk, cheese, butter, yogurt"
},
{
    name: "Soy", 
    description: "derived from soybeans", 
    ingredients: "soybeans, soymilk, tofu, miso, tempeh"
},
{
    name: "Nut", 
    description: "null", 
    ingredients: "walnut, almond, hazelnut, pecan, cashew pistachio, coconut"
},
{
    name: "Celiac", 
    description: "an immune reaction to eating gluten", 
    ingredients: "wheat, barley, rye"
},
{
    name: "Shellfish", 
    description: "mollusks", 
    ingredients: "shrimp, crab, lobster, clams, scallops, oysters, mussels"
},
{
    name: "Vegetarian", 
    description: "no meat or meat derivatives", 
    ingredients: "beef, chicken, lamb, pork"
}
];

const seedAllergy = () => Allergy.bulkCreate(allergydata);

module.exports = seedAllergy;