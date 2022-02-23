//dairy filter button
async function dairy() {
  document.location.replace('/allergy/dairy');
}

//soy filter button
async function soy() {
  document.location.replace('/allergy/soy');
}

//nuts filter button
async function nuts() {
  document.location.replace('/allergy/nut');
}

//celiac filter button
async function celiac() {
  document.location.replace('/allergy/celiac');
}

//shellfish filter button
async function shellfish() {
  document.location.replace('/allergy/shellfish');
}

//vegetarian filter button
async function vegetarian() {
  document.location.replace('/allergy/vegetarian');
}

let urlPath = document.location.href.split("/");
if (urlPath[3] === "" || urlPath[3] === "allergy") {
  document.querySelector("#vegetarian").addEventListener("click", vegetarian);
  document.querySelector("#shellfish").addEventListener("click", shellfish);
  document.querySelector("#dairy").addEventListener("click", dairy);
  document.querySelector("#soy").addEventListener("click", soy);
  document.querySelector("#nuts").addEventListener("click", nuts);
  document.querySelector("#celiac").addEventListener("click", celiac);
}