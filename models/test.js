let string = "parmesan cheese, pickle water{ marshmellow cream"

let result = string.split(/[^A-Za-z ]/).map((ingredient) => {
    return ingredient.trim()
})