const numberOfItems = localStorage.length

for(let i = 0; i <= numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i))
   console.log("objet à la position i", i, "est", item )
}