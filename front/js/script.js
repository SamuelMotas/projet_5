fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
       for (let i = 0; i < data.length; i++){
        addProducts(data[i])
       }
    })

function addProducts(couch) {
    const id = couch._id
    const imageUrl = couch.imageUrl
    const altTxt = couch.altTxt
    const name = couch.name
    const description = couch.description


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
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image

}

function makeArticle() {
    const article = document.createElement("article")
    return article
}

function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}


