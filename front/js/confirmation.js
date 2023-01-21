const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

function getOrderId() {
    const queryString = window.location.search
    //console.log(queryString)
    const urlParams = new URLSearchParams(queryString) //on récupere le urlParams du fichier product.js
    return urlParams.get("orderId")
}

//affiche le numero de commande
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//supprime les éléments du local storage après la validation de commande
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}