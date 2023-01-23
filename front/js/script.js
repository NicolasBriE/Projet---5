const produits = fetch('http://localhost:3000/Product.js').then(produits => produits.json());


function genererProduits(produits) {

    for (let i = 0; i < produits.length; i++) {

        const sectionItems = document.querySelector("#items");
        const aElement = document.createElement("a");
        const articleElement = document.createElement("article");
        aElement.appendChild(articleElement);
        const imageElement = document.createElement("imgUrl");
        const nomElement = document.createElement("name");
        const descriptionElement = document.createElement("description")
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
        articleElement.appendChild(descriptionElement);
        console.log()
    }
}