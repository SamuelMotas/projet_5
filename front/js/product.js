// Déclaration des paramètres URL à récupérer pour l'id --------
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}

// Appel de l'API --------
fetch(`http://localhost:3000/api/products/${id}`) // En rajoutant la variable id on demande uniquement le produit lié à l'ID
    .then(res => res.json())
    .then(res => handleData(res))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price } = couch // Les options seront sélectionnées en fonction de l'API demandée
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
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

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)


function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value //Il va lire le color et le quantity depuis le formulaire

    if (isOrderInvalid(color, quantity)) return;
    saveOrder(color, quantity)
    redirectToCart()
}

function saveOrder(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(id, JSON.stringify(data))
}

function isOrderInvalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("please select a color and quantity") //Envoie un message si les conditions ne sont pas remplies
        return true
    }
}

function redirectToCart() {
    window.location.href = "cart.html" //Redirige vers le panier (carte.html)
}