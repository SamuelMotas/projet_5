// Appel de l'API ----------
fetch("http://localhost:3000/api/products")  // On appelle la méthode fetch avec l'URL de notre API comme argument
    .then((res) => res.json()) // Fetch nous renvoie une promise, si l'API répond then() sera exécutée, ici pour récupérer le résultat via un JSON

    .then((data) => { // Et ensuite le résultat sera manipulé afin d'être exploitable pour notre application 
        for (let i = 0; i < data.length; i++) {  // Boucle crée pour itérer chaque produit disponible
            addProducts(data[i])// Création d'une nouvelle instance afin de pouvoir récuperer chaque paramètres de nos produits,et pouvoir les réutiliser  
        }
    })

//Function qui permet de récuperer chaque détail des produits
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

    //permet de donner un élément dans le HTML
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    anchor.appendChild(article)
    appendChildren(anchor)
}

// Mise en place d'éléments permettant d'afficher les articles
function makeAnchor(id) {
    const anchor = document.createElement("a") // Crée un nouvel élément a et l'ajoute à la fin du corps du document
    anchor.href = "./product.html?id=" + id   //on récupere l'id d'un produit
    return anchor
}

//function permettant de récuperer tout ce qui est dans l'élément #item
function appendChildren(anchor) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
}

//Function pour l'élément image et son texte
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl                       //On récupere les images et les textes
    image.alt = altTxt
    return image
   
}

//Function pour l'élément article
function makeArticle() {
    const article = document.createElement("article")
    return article
}

//Function pour le h3 et sa classe
function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")     //On récupère le nom des produits
    return h3
}

// Function pour l'élément description et sa classe
function makeParagraph(description) {
    const p = document.createElement("p")   // Crée un nouvel élément p et l'ajoute à la fin du corps du document
    p.textContent = description               //on récupère la description
    p.classList.add("productDescription")
    return p
}


