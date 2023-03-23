let url = new URL(window.location.href)
let params = new URLSearchParams(url.search)
let recupId = params.get("id")
console.log(recupId)

const sectionItem = document.querySelector(".item");

fetch(`http://localhost:3000/api/Products/${recupId}`)
    .then((response) => {
        return response.json();
    })

    .then((data) => {

        const imageItem = document.querySelector(".item__img");
        imageItem.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

        const nameItem = document.querySelector("#title");
        nameItem.innerText = data.name;

        const priceItem = document.querySelector("#price");
        priceItem.innerText = data.price;

        const descriptionItem = document.querySelector("#description");
        descriptionItem.innerText = data.description;

        const colorsItem = document.querySelector("#colors");
        console.log(data.colors);
        for (let i = 0; i < data.colors.length; i++) {
            colorsItem.innerHTML += `<option value = "${data.colors[i]}">${data.colors[i]}</option>`
        }

    })

let addToCartBtn = document.getElementById('addToCart')

addToCartBtn.addEventListener("click", function () {

    let idProduit = recupId;
    console.log(idProduit);
    let couleurProduit = document.getElementById("colors").value;
    console.log(couleurProduit);
    let quantiteProduit = Number(document.getElementById("quantity").value);
    console.log(quantiteProduit);

    class Produit {
        constructor(id, couleur, quantite) {
            this.id = id;
            this.couleur = couleur;
            this.quantite = quantite;

        }
    }

    let produitObj = new Produit(idProduit, couleurProduit, quantiteProduit);


    let panier = JSON.parse(localStorage.getItem("panier"))
    console.log(panier)
    let modifQuantite = false;


    if (!panier) {
        panier = [];
        panier.push(produitObj);
        console.log(panier);
        localStorage.setItem("panier", JSON.stringify(panier));
    }



    else {

        let i = 0;
        while (i < panier.length && !modifQuantite) {

            if (panier[i].id === produitObj.id && panier[i].couleur === produitObj.couleur) {
                panier[i].quantite += produitObj.quantite;
                modifQuantite = true;
                console.log(panier);
                console.log(modifQuantite);
                localStorage.setItem("panier", JSON.stringify(panier));
            }
            i++;

        }

        if (!modifQuantite) {
            panier.push(produitObj);
            console.log(panier);
            localStorage.setItem("panier", JSON.stringify(panier));
        }

    }


})










