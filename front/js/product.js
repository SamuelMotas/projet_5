// Déclaration des paramètres URL à récupérer pour l'id --------
const queryString = window.location.search //id du produit séléctionné
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")//Renvoie la première valeur associée au paramètre de recherche donné

/* if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
} */

// Appel de l'API --------
fetch(`http://localhost:3000/api/products/${id}`) // En rajoutant la variable id on demande uniquement le produit lié à l'ID (le canapé)
    .then(res => res.json())
    .then(res => handleData(res))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price } = couch // Les options seront sélectionnées en fonction de l'API demandée
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt) //on declare les variables
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
    
}

// Mise en place d'éléments permettant l'ajout d'articles au panier ---------------------------------------------------------------------------------------------

//affiche l'aimge du produit
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.altTxt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

//affiche le nom du produit
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

//fonction affichant le prix
function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}

//affiche la descritpion du produit
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

//fonction permettant de sélectionner une couleur
function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}

const button = document.querySelector("#addToCart") //affiche le bouton "ajouter au panier"
button.addEventListener("click", handleClick) //on créé la fonction permettant de créer un bouton cliquable

//function permettant de rendre cliquable le boutton "ajouter au panier"
function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value //Il va lire le color et le quantity depuis le formulaire

    if (isOrderInvalid(color, quantity)) //si les conditions sont remplis
        return;

    saveOrder(color, quantity)
    redirectToCart()
}

//permet de sauvegarder les produits dans le localStorage
function saveOrder(color, quantity) {
const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
    }
    localStorage.setItem(key, JSON.stringify(data))
}

//fonction permettant d'envoyer une alerte si le client n'a pas sélectionner de couleur ou quantité
function isOrderInvalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("please select a color and quantity") //Envoie un message si les conditions ne sont pas remplies
        return true
    }
    else {
        return false
    }
}

//Fonction permettant d'aller sur le lien du panier
function redirectToCart() {
    window.location.href = "cart.html" //Redirige vers le panier (carte.html)
}