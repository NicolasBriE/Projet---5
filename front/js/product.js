// Récupération de l'identifiant à partir de l'url
let url = new URL(window.location.href)
let params = new URLSearchParams(url.search)
let recupId = params.get("id")
let colorSelect = false;

const NB_MAX = 100;
const NB_MIN = 1;

function panierPush(panier, produitObj, nameProduit) {
    panier.push(produitObj);
    localStorage.setItem("panier", JSON.stringify(panier));
    window.alert(`Vous avez ajouté ${produitObj.quantite} ${nameProduit} ${produitObj.couleur} au panier.`);
}

fetch(`http://localhost:3000/api/Products/${recupId}`)
    .then((response) => {
        return response.json()
    })

    .then((data) => {
        // Création de l'image
        const imageItem = document.querySelector(".item__img");
        imageItem.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        // Création du titre
        const nameItem = document.querySelector("#title");
        nameItem.innerText = data.name;
        // Création du prix
        const priceItem = document.querySelector("#price");
        priceItem.innerText = data.price;
        // Création de la description
        const descriptionItem = document.querySelector("#description");
        descriptionItem.innerText = data.description;
        // Mise en place du choix couleurs
        const colorsItem = document.querySelector("#colors");
        for (let i = 0; i < data.colors.length; i++) {
            colorsItem.innerHTML += `<option value = "${data.colors[i]}">${data.colors[i]}</option>`
        }
        colorsItem.addEventListener("change", function () {
            if (!colorsItem.value) {
                colorSelect = false;
                window.alert("Veuillez sélectionner une couleur.")
            }

            else {
                colorSelect = true;
            }
        })

    })



const quantiteInput = document.getElementById("quantity");
quantiteInput.addEventListener("change", function () {
    if (quantiteInput.value < NB_MIN || quantiteInput.value > NB_MAX) {
        quantiteInput.value = 0;
        window.alert("Veuillez choisir un nombre entre 1 et 100.")
    }
})


let addToCartBtn = document.getElementById('addToCart')
// Ecoute sur le bouton Ajouter au panier
addToCartBtn.addEventListener("click", function () {


    if (quantiteInput.value >= NB_MIN && quantiteInput.value <= NB_MAX && colorSelect) {


        // Variables pour les informations de l'objet produit
        let idProduit = recupId;
        let couleurProduit = document.getElementById("colors").value;
        let quantiteProduit = Number(document.getElementById("quantity").value);
        // Création d'une classe produit
        class Produit {
            constructor(id, couleur, quantite, prix) {
                this.id = id;
                this.couleur = couleur;
                this.quantite = quantite;
                this.prix = prix;

            }
        }

        let produitObj = new Produit(idProduit, couleurProduit, quantiteProduit);

        let panier = JSON.parse(localStorage.getItem("panier"))
        let modifQuantite = false;
        let nameProduit = document.querySelector("#title").innerText;


        // Si le panier est vide , mettre le produit dedans
        if (!panier) {
            panier = [];
            panierPush(panier, produitObj, nameProduit);
        }


        else {
            // Tant que les deux conditions ne sont pas remplies, continuer la boucle
            let i = 0;
            while (i < panier.length && !modifQuantite) {
                // Si un élément du panier et le produit partagent la même id et couleur, augmenter la quantité dans le panier
                if (panier[i].id === produitObj.id && panier[i].couleur === produitObj.couleur) {
                    panier[i].quantite += produitObj.quantite;
                    if (panier[i].quantite > NB_MAX) {
                        modifQuantite = true;
                        window.alert("Vous ne pouvez pas choisir plus de 100 exemplaires d'un même produit.");
                    }
                    else {
                        modifQuantite = true;
                        localStorage.setItem("panier", JSON.stringify(panier));
                        window.alert(`Vous avez ajouté ${produitObj.quantite} ${nameProduit} ${produitObj.couleur} au panier.`);
                    }
                }
                i++;

            }
            // Si ce lien n'a pas été trouvé, mettre le produit dans le panier
            if (!modifQuantite) {
                panierPush(panier, produitObj, nameProduit);
            }

        }

    }

    else if (quantiteInput.value < NB_MIN || quantiteInput.value > NB_MAX) {
        window.alert("Veuillez choisir un nombre entre 1 et 100.")
    }

    else if (!colorSelect) {
        window.alert("Veuillez sélectionner une couleur.")
    }

}
)










