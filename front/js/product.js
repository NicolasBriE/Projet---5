let url = new URL(window.location.href)
let params = new URLSearchParams(url.search)
let recupId = params.get("id")

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
        for (let i = 0; i < data.colors.length; i++) {
            colorsItem.innerHTML += `<option value = "${data.colors[i]}">${data.colors[i]}</option>`
        }

    })

let addToCartBtn = document.getElementById('addToCart')

addToCartBtn.addEventListener("click", function () {

    let idProduit = recupId;
    let couleurProduit = document.getElementById("colors").value;
    let quantiteProduit = Number(document.getElementById("quantity").value);

    class Produit {
        constructor(id, couleur, quantite) {
            this.id = id;
            this.couleur = couleur;
            this.quantite = quantite;

        }
    }

    let produitObj = new Produit(idProduit, couleurProduit, quantiteProduit);


    let panier = JSON.parse(localStorage.getItem("panier"))
    let modifQuantite = false;


    if (!panier) {
        panier = [];
        panier.push(produitObj);
        localStorage.setItem("panier", JSON.stringify(panier));
    }



    else {

        let i = 0;
        while (i < panier.length && !modifQuantite) {

            if (panier[i].id === produitObj.id && panier[i].couleur === produitObj.couleur) {
                panier[i].quantite += produitObj.quantite;
                modifQuantite = true;
                console.log(modifQuantite);
                localStorage.setItem("panier", JSON.stringify(panier));
            }
            i++;

        }

        if (!modifQuantite) {
            panier.push(produitObj);
            localStorage.setItem("panier", JSON.stringify(panier));
        }

    }


})










