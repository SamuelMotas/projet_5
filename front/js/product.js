const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")


fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then(res => handleData(res))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price } = couch 

    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

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