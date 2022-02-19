//dairy filter button
async function dairy() {
  document.location.replace('/allergy/dairy');
}

document.querySelector('#dairy').addEventListener('click', dairy);

//soy filter button
async function soy() {
  document.location.replace('/allergy/soy');
}

document.querySelector('#soy').addEventListener('click', soy);


//nuts filter button
async function nuts() {
  document.location.replace('/allergy/nuts');
}

document.querySelector('#nuts').addEventListener('click', nuts);


//celiac filter button
async function celiac() {
  document.location.replace('/allergy/celiac');
}

document.querySelector('#celiac').addEventListener('click', celiac);


//shellfish filter button
async function shellfish() {
  document.location.replace('/allergy/shellfish');
}

document.querySelector('#shellfish').addEventListener('click', shellfish);


//vegetarian filter button
async function vegetarian() {
  document.location.replace('/allergy/vegetarian');
}

document.querySelector('#vegetarian').addEventListener('click', vegetarian);
