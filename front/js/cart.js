const cart = [] //on recupere chaque produit ajouté au panier
retrieveItemsFromCache()



function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || "" //on récupère le item avec le localStorage
        const itemObject = JSON.parse(item)
        fetch(`http://localhost:3000/api/products/${itemObject.id}`) // En rajoutant la variable id on demande uniquement le produit lié à l'ID
            .then(res => res.json())
            .then(couchdata => {
                const couch = {
                    id: itemObject.id,
                    color: itemObject.color,
                    quantity: itemObject.quantity,
                    price: couchdata.price,
                    imageUrl: couchdata.imageUrl,
                    altTxt: couchdata.altTxt,
                    name: couchdata.name
                }
                cart.push(couch)
                displayItem(couch)
            })
    }
}

function displayItem(item) {
    const article = makeArticle(item)  // on fait un article
    const imageDiv = makeImageDiv(item) //on fabrique une imageDiv
    article.appendChild(imageDiv)  // on l'ajoute là

    const cardItemContent = makeCartContent(item) // on fait un card content
    article.appendChild(cardItemContent)

    displayArticle(article) // on a fait un article et on l'a affiché
    displayTotalQuantity()
    displayTotalPrice()
}

//total de la quantité des produits
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        total = cart[i].quantity + total
    }
    totalQuantity.textContent = total
}

//total du prix total des produits
function displayTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    /*cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })*/
    for (let i = 0; i < cart.length; i++) {
        const totalUnitPrice = cart[i].price * cart[i].quantity
        total += totalUnitPrice
    }
    totalPrice.textContent = total
}

//on créé une fonction pour la descritpion de chaque produits
function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p") // on ajoute la quantité
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

//on fait la fonction qui englobe la quantité et qui permet de supprimer les produits
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addDeleteToSettings(settings, item)//cette fonction permet de supprimer l'article
    addQuantityToSettings(settings, item)// cette fonction gère la quantité
    return settings
}

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)

    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

// On déclare  la function qui permet de supprimer l'article
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))//permet de supprimer le produit quand on clique sur "supprimer"

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}


function updatePriceQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    //const key = `${item.id} + ${item.color}`
    localStorage.setItem(item.id, dataToSave)
}

//On fait la fonction qui englobe toute la div des descriptions des produits 
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")// on récupère la class dans le DOM

    const h2 = document.createElement("h2")//On créé l'élément h2 du DOM
    h2.textContent = item.name
    const p = document.createElement("p")//On créé l'élément p qui est la couleur dans le DOM
    p.textContent = item.color;
    const p2 = document.createElement("p")//on créé l'élément p qui est le prix du produit dans le DOM
    p2.textContent = item.price + " €";

    //on utilise ces méthode pour ajouter un noeud en tant que dernier enfant de l'élément
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

