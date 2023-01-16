// Appel de l'API ----------
fetch("http://localhost:3000/api/products")  // On appelle la méthode fetch avec l'URL de notre API comme argument
    .then((res) => res.json()) // Fetch nous renvoie une promise, si l'API répond then() sera exécutée, ici pour récupérer le résultat via un JSON
    .then((data) => { // Et ensuite le résultat sera manipulé afin d'être exploitable pour notre application 
        for (let i = 0; i < data.length; i++) {  // Boucle crée pour répéter chaque produit disponible
            ajoutProduit(data[i])// Création d'une nouvelle instance afin de pouvoir récuperer chaque paramètres de nos produits,et pouvoir les réutiliser  
           //console.log("nombre de canape")
        }
    })

//Function qui permet de récuperer chaque détail des produits
function ajoutProduit(canape) {
    const id = canape._id
    const imageUrl = canape.imageUrl
    const altTxt = canape.altTxt    // Les options seront sélectionnées en fonction de l'API demandée
    const name = canape.name
    const description = canape.description

    // on déclare les variables
    const product = fabLien(id)
    const image = fabImage(imageUrl, altTxt)
    const article = fabArticle()
    const h3 = fabH3(name)
    const p = fabParagraphe(description)

    //permet de donner un élément dans le HTML
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    product.appendChild(article)
    ajoutChildren(product)
}

// Mise en place d'éléments permettant d'afficher les articles
//fonction qui permet de créer le lien qui mene au produit
function fabLien(id) {
    const product = document.createElement("a") // Crée un nouvel élément a et l'ajouter à la fin du corps du document
    product.href = "./product.html?id=" + id   //on récupere l'id d'un produit
    return product
}

//function permettant de récuperer tout ce qui est dans l'élément #item
function ajoutChildren(product) {
    const items = document.querySelector("#items") //on sélectionne l'élément #item
    items.appendChild(product)
}

//Function pour l'élément image et son texte
function fabImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl                       //On récupere les images et les textes
    image.alt = altTxt
    return image
}

//Function pour l'élément article
function fabArticle() {
    const article = document.createElement("article")
    return article
}

//Function pour le h3 et sa classe
function fabH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")     //On récupère le nom des produits
    return h3
}

// Function pour l'élément description et sa classe
function fabParagraphe(description) {
    const p = document.createElement("p")   // Crée un nouvel élément p et l'ajoute à la fin du corps du document
    p.textContent = description               //on récupère la description
    p.classList.add("productDescription")
    return p
}


