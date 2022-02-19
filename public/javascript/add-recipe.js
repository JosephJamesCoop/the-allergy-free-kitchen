async function recipeFormHandler(event) {
    event.preventDefault();

    const recipe_post = document.querySelector('textarea[name="recipe-body"]').value.trim();
    
    const recipe_id = window.loction.toString().split('/')[
        window.loction.toString().split('/').length - 1
    ];

    console.log(recipe_post, recipe_id);
}

document.querySelector('.recipe-form').addEventListener('submit', recipeFormHandler);