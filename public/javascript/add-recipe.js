document.querySelector('.add-recipe-form').addEventListener('click', recipeFormHandler);

async function addRecipe() {
  document.location.replace('/add-recipe');
}

async function recipeFormHandler(event) {
  event.preventDefault();
  
  const title = document.querySelector('input[name="recipe-title"]').value;
  const description = document.querySelector('input[name="recipe-description"]').value;
  const ingredients = document.querySelector('input[name="recipe-ingredients"]').value;
  const instructions = document.querySelector('input[name="recipe-instructions"]').value;
  if (title && description && ingredients && instructions) {

    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredients,
        instructions
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      document.location.replace('/userprofile');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#addRecipe').addEventListener('click', addRecipe);
