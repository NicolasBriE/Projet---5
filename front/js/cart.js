let panier;



if (JSON.parse(localStorage.getItem("panier")) != null) {
    panier = JSON.parse(localStorage.getItem("panier"))
}

else {
    panier = []
}

const cartItems = document.getElementById('cart__items')
const totalQuantite = document.getElementById("totalQuantity");
const calculPrix = document.getElementById("totalPrice");


// Fonction pour calculer les nouveaux prix et quantité à partir du panier et mettre à jour le dom
function calculTotauxQtePrix(panier) {

    let total = {
        quantite: 0,
        prix: 0
    }

    for (let i = 0; i < panier.length; i++) {
        total.quantite += Number(panier[i].quantite);
        total.prix += Number(panier[i].prix) * Number(panier[i].quantite)



    }
    return total
}




// Fonction pour mettre à jour le panier lorsqu'on supprime un produit, et mettre à jour le dom avec la fonction précédente
function majPanier(cartItem, data) {
    let removeProduct = panier.findIndex((element) => element.id === cartItem.dataset.id && element.couleur === cartItem.dataset.color);
    panier.splice(removeProduct, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    cartItem.remove();
    window.alert("Ce produit a été supprimé du panier.")
}

// Si le panier est vide, envoyer un message d'erreur
function hideFormulaire() {
    window.alert("Votre panier est vide");
    const hideForm = document.querySelector(".cart__order")
    hideForm.style.display = "none";
}

function panierVide() {

    if (panier.length === 0) {
        hideFormulaire();
        totalQuantite.innerText = null;
        calculPrix.innerText = null;
    }

}

function verifInput(regex, champInput, errorMessage) {

    if (regex.test(champInput.value)) {
        errorMessage.innerText = "";

        return true;
    }

    else {
        errorMessage.innerText = "Veuillez remplir le champ correctement.";

        return false;
    }
}


panierVide();


for (let i = 0; i < panier.length; i++) {
    // Récupération de l'élément dans l'api qui correspond à l'élément dans le panier pour avoir toutes les informations nécessaires
    fetch(`http://localhost:3000/api/Products/${panier[i].id}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            // Création de l'article
            const cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            cartItem.setAttribute("data-id", panier[i].id)
            cartItem.setAttribute("data-color", panier[i].couleur)
            cartItems.appendChild(cartItem);
            // Création de la div image
            const cartItemImg = document.createElement("div");
            cartItemImg.className = "cart__item__img";
            cartItem.appendChild(cartItemImg);
            // Création de l'image
            const imageItems = document.createElement("img");
            imageItems.src = data.imageUrl;
            imageItems.alt = data.altTxt;
            cartItemImg.appendChild(imageItems);
            // Création de la div content
            const cartItemContent = document.createElement("div");
            cartItemContent.className = "cart__item__content";
            cartItem.appendChild(cartItemContent);
            // Création de la div content description
            const cartItemContentDescription = document.createElement("div");
            cartItemContentDescription.className = "cart__item__content__description";
            cartItemContent.appendChild(cartItemContentDescription);
            // Création du titre
            const nomItem = document.createElement("h2");
            nomItem.innerText = data.name;
            cartItemContentDescription.appendChild(nomItem);
            // Création de la couleur
            const couleurItem = document.createElement("p");
            couleurItem.innerText = panier[i].couleur;
            cartItemContentDescription.appendChild(couleurItem);
            // Création du prix
            const prixItem = document.createElement("p");
            prixItem.innerText = data.price + "€";
            panier[i].prix = data.price;
            cartItemContentDescription.appendChild(prixItem);
            // Création de la div content settings
            const cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.className = "cart__item__content__settings";
            cartItemContent.appendChild(cartItemContentSettings);
            // Création de la div content settings quantity
            const cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
            // Création de la quantité
            const quantite = document.createElement("p");
            quantite.innerText = "Qté";
            cartItemContentSettingsQuantity.appendChild(quantite);
            // Création de l'input quantité
            const quantiteInput = document.createElement("input");
            quantiteInput.setAttribute("type", "number");
            quantiteInput.setAttribute("class", "itemQuantity");
            quantiteInput.setAttribute("name", "itemQuantity");
            // Ecoute de l'input quantité
            quantiteInput.addEventListener("change", function () {
                // Si la valeur est comprise entre 1 et 100, récupérer dans le panier l'élément qui correspond et mettre à jour la quantité, puis le dom
                if (quantiteInput.value >= 1 && quantiteInput.value <= 100) {
                    let modifQuant = panier.find(element => element.id === cartItem.dataset.id && element.couleur === cartItem.dataset.color);
                    modifQuant.quantite = parseInt(quantiteInput.value);
                    localStorage.setItem("panier", JSON.stringify(panier));

                }


                // Sinon, envoyer un message pour signifier que c'est impossible
                else {
                    let modifQuant = panier.find(element => element.id === cartItem.dataset.id && element.couleur === cartItem.dataset.color);
                    quantiteInput.value = modifQuant.quantite;

                    window.alert("La quantité sélectionnée doit être comprise entre 1 et 100.")

                }

                let total = calculTotauxQtePrix(panier);
                totalQuantite.innerText = total.quantite;
                calculPrix.innerText = total.prix;

            })


            quantiteInput.setAttribute("min", "1");
            quantiteInput.setAttribute("max", "100");
            quantiteInput.setAttribute("value", `${panier[i].quantite}`);
            cartItemContentSettingsQuantity.appendChild(quantiteInput);
            const cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
            // Création du bouton Supprimer
            const boutonSupprimer = document.createElement("p");
            boutonSupprimer.className = "deleteItem";
            boutonSupprimer.textContent = "Supprimer";
            // Ecoute du bouton Supprimer, au clic, supprimer du panier et du dom
            boutonSupprimer.addEventListener("click", () => {
                majPanier(cartItem, data);
                if (panier.length > 0) {
                    total = calculTotauxQtePrix(panier);
                    totalQuantite.innerText = total.quantite;
                    calculPrix.innerText = total.prix;
                }
                else {
                    panierVide();
                }


            }

            )
            cartItemContentSettingsDelete.appendChild(boutonSupprimer);
            let total = calculTotauxQtePrix(panier);
            totalQuantite.innerText = total.quantite;
            calculPrix.innerText = total.prix;
        })

}




// Variables pour les champs du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
// Regex à utiliser
let nameRegex = /^[A-Za-z\é\è\ê\ç\ë\ù\ê\à\ ]+$/;
let addressRegex = /^[A-Za-z0-9\é\è\ê\ç\ë\ù\ê\à\, ]+$/;
let emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9]+[.]+[\w-]{2,4}$/;



let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
let addressErrorMessage = document.getElementById("addressErrorMsg");
let cityErrorMessage = document.getElementById("cityErrorMsg");
let emailErrorMessage = document.getElementById("emailErrorMsg");


// Ecoute du champ firstname
firstName.addEventListener("change", function () {

    verifInput(nameRegex, firstName, firstNameErrorMessage);

})

lastName.addEventListener("change", function () {

    verifInput(nameRegex, lastName, lastNameErrorMessage);

})

address.addEventListener("change", function () {

    verifInput(addressRegex, address, addressErrorMessage);

})

city.addEventListener("change", function () {

    verifInput(nameRegex, city, cityErrorMessage);

})

email.addEventListener("change", function () {

    verifInput(emailRegex, email, emailErrorMessage);

})



// Récupération du bouton commander
boutonCommander = document.getElementById("order");

// Ecoute du bouton commander
boutonCommander.addEventListener("click", (event) => {
    event.preventDefault();


    // Si les tests regex sont bons, récupérer les id dans le panier et les infos dans les champs du formulaire, et créer l'ensemble à envoyer
    if (verifInput(nameRegex, firstName, firstNameErrorMessage) &&
        verifInput(nameRegex, lastName, lastNameErrorMessage) &&
        verifInput(addressRegex, address, addressErrorMessage) &&
        verifInput(nameRegex, city, cityErrorMessage) &&
        verifInput(emailRegex, email, emailErrorMessage)) {

        let idList = []

        for (let i = 0; i < panier.length; i++) {
            idList.push(panier[i].id)
        }

        let commande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: idList,
        }
        // Méthode pour envoyer la commande
        let envoiCommande = {
            method: 'POST',
            body: JSON.stringify(commande),
            headers: { 'Content-Type': 'application/json' }
        }
        // Envoi de la commande et récupération de l'id commande
        fetch(`http://localhost:3000/api/Products/order`, envoiCommande)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Renvoi vers la page confirmation avec l'id de la commande dans l'url
                window.location.assign(`./confirmation.html?orderId=${data.orderId}`)
                localStorage.clear();
                let total = calculTotauxQtePrix(panier);
                totalQuantite.innerText = total.quantite;
                calculPrix.innerText = total.prix;

            })

    }

    // Si les champs du formulaire ne sont pas bien remplis
    else {
        window.alert("Veuillez remplir les champs du formulaire correctement.");
    }

}
)