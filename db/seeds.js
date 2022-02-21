const { Allergy, User, Recipe } = require('../models');

const seed = async () => {
    await User.create({
        username: "bootcamp", 
        password: "reallygoodpassword", 
        email: "email@email.com", 
        first_name: "Kellie", 
        last_name: "Harman"
    })
    await Recipe.create({
        name: "shrimp tacos",
        description: "delish shrimp tacos",
        instructions: "1.season shrimp and fry 2. add toppings",
        ingredients: "shrimp, tortillas, lime, avocado, cabbage, cilantro",
        user_id: 1,
        nuts: 0, 
        soy: 0, 
        vegetarian: 0
    })
    await Recipe.create({
        name: "tofu scramble",
        description: "delish tofu scramble",
        instructions: "1.drain and press tofu 2.crumble tofu and season 3. scramble in a pan and add veggies",
        ingredients: "tofu, onions, spinach, peppers",
        user_id: 1,
        vegetarian: 0,
        nuts: 0, 
        dairy: 0, 
        shellfish: 0, 
        celiac: 0
    })
    await Recipe.create({
        name: "peanut butter",
        description: "delish homemade peanut butter",
        instructions: "1.grind peanuts in food processor until smooth 2.add salt to taste",
        ingredients: "peanuts, salt",
        user_id: 1,
        dairy: 0, 
        soy: 0, 
        celiac: 0, 
        shellfish: 0, 
        vegetarian: 0
    })
    await Recipe.create({
        name: "feta dip",
        description: "delish feta dip",
        instructions: "1.combine feta, olive oil, and herbs 2.stir",
        ingredients: "feta, olive oil, basil, thyme",
        user_id: 1, 
        soy: 0, 
        nuts: 0, 
        celiac: 0, 
        shellfish: 0, 
        vegetarian: 0
    })
    await Recipe.create({
        name: "fried chicken",
        description: "delish fried chicken",
        instructions: "1.dredge chicken in buttermilk, then flour 2. fry",
        ingredients: "chicken, buttermilk, flour",
        user_id: 1,
        soy: 0,
        nuts: 0,
        shellfish: 0
    })
    await Allergy.create({
        name: "Dairy", 
        description: "derived from milk", 
        ingredients: "milk, cheese, butter, yogurt"
    })
    await Allergy.create({
        name: "Soy", 
        description: "derived from soybeans", 
        ingredients: "soybeans, soymilk, tofu, miso, tempeh"
    })
    await Allergy.create({
        name: "Nut", 
        description: "null", 
        ingredients: "walnut, almond, hazelnut, pecan, cashew pistachio, coconut"
    })
    await Allergy.create({
        name: "Celiac", 
        description: "an immune reaction to eating gluten", 
        ingredients: "wheat, barley, rye"
    })
    await Allergy.create({
        name: "Shellfish", 
        description: "mollusks", 
        ingredients: "shrimp, crab, lobster, clams, scallops, oysters, mussels"
    })
    await Allergy.create({
        name: "Vegetarian", 
        description: "no meat or meat derivatives", 
        ingredients: "beef, chicken, lamb, pork"
    })
    const allergy = await Allergy.findByPk(1);
    const recipe = await Recipe.findByPk(1);
    await recipe.addAllergy(allergy);
}
seed()