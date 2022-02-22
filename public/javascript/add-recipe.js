//const recipe_post_l = document.querySelector('textarea[name="recipe-body"]');
async function recipe() {
    document.location.replace('/api/recipe');
  }
  
  document.querySelector('#add-recipe').addEventListener('click', recipe);

async function recipeFormHandler(event) {
    event.preventDefault();
    
 //  const recipe_id = window.loction.toString().split('/')[
 //   window.loction.toString().split('/').length - 1
//];

  //  const recipe_post = recipe_post_l.value.trim();
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
            'Content-Type': 'application/json'}
    })
    // create object and fetch method/post

      
    if (response.ok) {
      document.location.replace('/userprofile');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('add-recipe-form').addEventListener('click', recipeFormHandler);