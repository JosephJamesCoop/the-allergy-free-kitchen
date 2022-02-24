async function recipeFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="recipe-title"]').value;
  const description = document.querySelector(
    'input[name="recipe-description"]'
  ).value;
  const ingredients = document.querySelector(
    'input[name="recipe-ingredients"]'
  ).value;
  const instructions = document.querySelector(
    'input[name="recipe-instructions"]'
  ).value;

  console.log(title, description, ingredients, instructions)
  if (title && description && ingredients && instructions) {
    const response = await fetch(`../api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        description,
        instructions,
        ingredients
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
