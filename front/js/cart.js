const cart = []

retrieveItemsFromCache()



/* altTxt: "Photo d'un canapé gris, trois places"
color: "Purple"
id: "8906dfda133f4c20a9d0e34f18adcf06"
imageUrl: "http://localhost:3000/images/kanap05.jpeg"
price: 2249
quantity: 1 
name: "caa" */

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || "" //on récupère le item
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
console.log(displayItem)
    }
}

function displayItem(item) {
    const article = makeArticle(item)  // on fait un article
    const imageDiv = makeImageDiv(item) //on fabrique une imageDiv
    article.appendChild(imageDiv)  // on l'ajoute là

    const cardItemContent = makeCartContent(item) // on fait un card content
    article.appendChild(cardItemContent)

    displayArticle(article) // on a fait un article et on l'a affiché
}


function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    return settings
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
    settings.appendChild(input)
}

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color;
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €";

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
