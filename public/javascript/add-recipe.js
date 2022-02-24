async function recipeFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="recipe-title"]').value;
  const description = document.querySelector(
    'input[name="recipe-description"]'
  ).value;

  const ingredientsNodes = document.querySelectorAll(".recipe-ingredients")
  const ingredients = Array.from(ingredientsNodes).map((ingredientNode) => ingredientNode.value).filter(ingredient => ingredient != "")

  const instructionsNodes = document.querySelectorAll(".recipe-instructions")
  const instructions = Array.from(instructionsNodes).map((instructionNode) => instructionNode.value).filter(instruction => instruction != "")

  const allergenCheckNodes = document.querySelectorAll(".form-check-input")

  let allergens = {};
  Array.from(allergenCheckNodes).forEach(allergenCheckNode => {
    allergens[allergenCheckNode.name] = allergenCheckNode.checked
  })

  console.log(title, description, ingredients, instructions, allergens)
  if (title && description && ingredients && instructions) {
    const response = await fetch(`../api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        description,
        instructions,
        ingredients,
        allergens
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // create object and fetch method/post

    if (response.ok) {
      document.location.replace("/userprofile");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#add-recipe-form")
  .addEventListener("submit", recipeFormHandler);
