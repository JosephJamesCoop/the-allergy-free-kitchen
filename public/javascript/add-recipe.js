async function recipeFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const description = document.querySelector("#recipe-description").value.trim();
  const ingredients = document.querySelector("#recipe-ingredients").value.trim();
  const instructions = document.querySelector("#recipe-instructions").value.trim();

  const dairy = document.querySelector('#dairyFree').value.trim();
  const soy = document.querySelector('#soyFree').value.trim();
  const nuts = document.querySelector('#nutFree').value.trim();
  const celiac = document.querySelector('#celiacYes').value.trim();
  const shellfish = document.querySelector('#shellfishFree').value.trim();
  const vegetarian = document.querySelector('#vegetarianCheck').value.trim();

  if (name && description && ingredients && instructions ) {
    const response = await fetch(`/api/recipes`, {
      method: "post",
      body: JSON.stringify({
        name,
        description,
        instructions,
        ingredients,
        dairy,
        soy,
        nuts,
        celiac,
        shellfish,
        vegetarian,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // create object and fetch method/post
    console.log("failure");
    if (response.ok) {
      console.log("success");
      document.location.replace("/userprofile");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".addRecipeForm")
  .addEventListener("submit", recipeFormHandler);
