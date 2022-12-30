const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString) //on récupere le urlParams du fichier product.js
    return urlParams.get("orderId")
}


function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}