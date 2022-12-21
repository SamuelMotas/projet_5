// Appel de l'API ----------
fetch("http://localhost:3000/api/products")  // On appelle la méthode fetch avec l'URL de notre API comme argument
    .then((res) => res.json()) // Fetch nous renvoie une promise, si l'API répond then() sera exécutée, ici pour récupérer le résultat via un JSON

    .then((data) => { // Et ensuite le résultat sera manipulé afin d'être exploitable pour notre application 
        for (let i = 0; i < data.length; i++) {
            // Boucle crée pour itérer chaque produit disponible
            addProducts(data[i])// Création d'une nouvelle instance afin de pouvoir récuperer chaque paramètres de nos produits,et pouvoir les réutiliser  
        }
    })

function addProducts(couch) {
    const id = couch._id
    const imageUrl = couch.imageUrl
    const altTxt = couch.altTxt    // Les options seront sélectionnées en fonction de l'API demandée
    const name = couch.name
    const description = couch.description

    // on déclare les variables
    const anchor = makeAnchor(id)
    const image = makeImage(imageUrl, altTxt)
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makeParagraph(description)


    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    anchor.appendChild(article)
    appendChildren(anchor)
}


// Mise en place d'éléments permettant d'afficher les articles
function makeAnchor(id) {
    const anchor = document.createElement("a") 
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)

}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img") //Function pour l'élément image et son texte
    image.src = imageUrl
    image.alt = altTxt
    return image

}

function makeArticle() {
    const article = document.createElement("article") //Function pour l'élément article
    return article
}

function makeH3(name) {
    const h3 = document.createElement("h3") //Function pour le h3 et sa classe
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function makeParagraph(description) {
    const p = document.createElement("p") // Function pour l'élément description et sa classe
    p.textContent = description
    p.classList.add("productDescription")
    return p
}


