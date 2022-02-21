const recipe_post_l = document.querySelector('textarea[name="recipe-body"]');
    
const recipe_id = window.loction.toString().split('/')[
    window.loction.toString().split('/').length - 1
];

async function recipeFormHandler(event) {
    event.preventDefault();
    const recipe_post = recipe_post_l.value.trim();
 
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            recipe_post_l,
            recipe_id
        }),
        headers: { 
            'Content-Type': 'application/json'}
    })
    // create object and fetch method/post

    if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }


document.querySelector('.add-recipe-form').addEventListener('add-recipe', recipeFormHandler);