const cart = [] //on recupere chaque produit ajouté au panier

retrieveItemsFromCache()

//variable du bouton "Commander!"
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

//fonction pour récuperer les produits du cache de la page product
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

//function permettant l'affichage des éléments
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

//function permettant de gérer la quantité par produit
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

//fonction permettant de supprimer l'article 
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

//function permettant de mettre à jour le prix quand on change la quantité de produit
function updatePriceQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

//fonction permettant de supprimer un article du local storage
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

//enregistre des produits dans le cache
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

//affiche l'article
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

//créé l'article
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

//fonction permettant d'envoyer un message d'alerte si un produit n'est pas sélectionné pour achat
function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("SVP sélectionnez un produit à acheter") //envoie un mesage d'alerte si le client n'a pa sélectionné de canapé
        return
    }

    if (isFormInvalid()) return    //retour si le formulaire et les email snt invalides
    if (isEmailInvalid()) return

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.error(err)) //
}

//Message d'alert si l'email n'est pas valide
function isEmailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/ //permet de verifier si l'email est valide
    if (regex.test(email) === false) {
        alert("SVP Entrez votre email valide") //Envoie un mesage si le champs email n'est pas remplis
        return true
    }
    return false
}

//Mesage d'aletre si les champs du formulaire ne sont pas remplis
function isFormInvalid() {
    const firstName = document.querySelector("#firstName")
    if (firstName.value === "") {
        alert("Attention, le champ prénom n'est pas rempli")
        return true;
    }

    const lastName = document.querySelector("#lastName")
    if (lastName.value === "") {
        alert("Attention, le champ nom n'est pas rempli")
        return true;
    }

    const address = document.querySelector("#address")
    if(address.value === "") {
      alert("Attention, le champ adresse n'est pas rempli")
      return true;
    }

    const city = document.querySelector("#city")
    if(city.value === "") {
      alert("Attention, le champ ville n'est pas rempli")
      return true;
    }

   const email = document.querySelector("#email")
    if(email.value === "") {
      alert("Attention, le champ email n'est pas rempli")
      return true;
    }
}

//fonction permettant de remplir le formulaire
function makeRequestBody() {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const address = document.querySelector("#address").value
    const city = document.querySelector("#city").value
    const email = document.querySelector("#email").value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()
    }
    console.log(body)
    return body
}

//affiche les produits dans le local storage
function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || "" //on récupère le item avec le localStorage
        const itemObject = JSON.parse(item)
        const id = itemObject.id
        ids.push(id)
    }
    return ids
}
