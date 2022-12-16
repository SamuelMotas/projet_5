// Déclaration des paramètres URL à récupérer pour l'id --------
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

// Appel de l'API --------
fetch(`http://localhost:3000/api/products/${id}`)// En rajoutant la variable urlID on demande uniquement le produit lié à l'ID
    .then(res => res.json())
    .then(res => handleData(res))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price } = couch // Les options seront sélectionnées en fonction de l'API demandée

    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// Mise en place d'éléments permettant l'ajout d'articles au panier ---------------------------------------------------------------------------------------------

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.altTxt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })

}