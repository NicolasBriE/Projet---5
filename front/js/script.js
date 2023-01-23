
async function genererProduits() {
    const reponse = await fetch('http://localhost:3000/Product.js');
    const produit = await reponse.url();
    for (let i = 0; i < produit.length; i++) {

        const sectionIndex = document.querySelector("#items");
        const produitElement = document.createElement("produit");
        const imageElement = document.createElement("imgUrl");
        const nomElement = document.createElement("name");
        const descriptionElement = document.createElement("description")
        console.log()
    }
}