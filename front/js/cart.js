let panier = JSON.parse(localStorage.getItem("panier"))

const cartItems = document.getElementById('cart__items')

// Fonction pour calculer les nouveaux prix et quantité à partir du panier et mettre à jour le dom
function calculTotauxQtePrix(data) {
    let totalQte = 0;
    let totalPrix = 0;

    for (i = 0; i < panier.length; i++) {
        totalQte += Number(panier[i].quantite);
        const details = data.find((element) => element._id === panier[i].id);
        totalPrix += (details.price) * (panier[i].quantite);
    }

    const totalQuantite = document.getElementById("totalQuantity");
    totalQuantite.innerText = totalQte;

    const calculPrix = document.getElementById("totalPrice");
    calculPrix.innerText = totalPrix;

}

// Fonction pour mettre à jour le panier lorsqu'on supprime un produit, et mettre à jour le dom avec la fonction précédente
function majPanier(cartItem, data) {
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === cartItem.getAttribute("data-id") && panier[i].couleur === cartItem.getAttribute("data-color")) {
            panier.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(panier));
            calculTotauxQtePrix(data);
        }
    }
    cartItem.remove();
    window.alert("Ce produit a été supprimé du panier.")
}

// Si le panier est vide, envoyer un message d'erreur
if (panier.length === 0) {
    window.alert("Votre panier est vide");
    const hideForm = document.querySelector(".cart__order")
    hideForm.style.display = "none";
}

// Récupération des données de l'api
fetch('http://localhost:3000/api/Products/')
    .then((response) => {
        return response.json();
    })

    .then((data) => {

        for (let i = 0; i < panier.length; i++) {

            // Récupération de l'élément dans l'api qui correspond à l'élément dans le panier pour avoir toutes les informations nécessaires
            const details = data.find((element) => element._id === panier[i].id);
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
            imageItems.src = details.imageUrl;
            imageItems.alt = details.altTxt;
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
            nomItem.innerText = details.name;
            cartItemContentDescription.appendChild(nomItem);
            // Création de la couleur
            const couleurItem = document.createElement("p");
            couleurItem.innerText = panier[i].couleur;
            cartItemContentDescription.appendChild(couleurItem);
            // Création du prix
            const prixItem = document.createElement("p");
            prixItem.innerText = details.price + "€";
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
                    modifQuant.quantite = quantiteInput.value;
                    localStorage.setItem("panier", JSON.stringify(panier));
                    calculTotauxQtePrix(data);
                }
                // Si la valeur est 0, supprimer du panier et du dom
                else if (quantiteInput.value == 0) {
                    majPanier(cartItem, data);
                }
                // Si la valeur est supérieure à 100, envoyer un message pour signifier que c'est impossible
                else if (quantiteInput.value > 100) {
                    window.alert("Vous ne pouvez pas choisir plus de 100 exemplaires d'un même produit.")
                }

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
            }

            )
            cartItemContentSettingsDelete.appendChild(boutonSupprimer);

        }



        // Mettre à jour prix et quantité
        calculTotauxQtePrix(data);
    })


// Variables pour les champs du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
// Regex à utiliser
let nameRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
let addressRegex = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;
let emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
// Variables pour les tests regex
let verifFirstName;
let verifLastName;
let verifAddress;
let verifCity;
let verifEmail;

// Ecoute du champ firstname
firstName.addEventListener("change", function () {
    // Message à envoyer en cas d'erreur
    let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");


    if (nameRegex.test(firstName.value)) {
        verifFirstName = true;
        firstNameErrorMessage.innerText = "";
    }

    else {
        verifFirstName = false;
        firstNameErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }

})

lastName.addEventListener("change", function () {
    let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");



    if (nameRegex.test(lastName.value)) {
        verifLastName = true;
        lastNameErrorMessage.innerText = "";
    }

    else {
        verifLastName = false;
        lastNameErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

address.addEventListener("change", function () {
    let addressErrorMessage = document.getElementById("addressErrorMsg");



    if (addressRegex.test(address.value)) {
        verifAddress = true;
        addressErrorMessage.innerText = "";
    }

    else {
        verifAddress = false;
        addressErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

city.addEventListener("change", function () {
    let cityErrorMessage = document.getElementById("cityErrorMsg");



    if (nameRegex.test(city.value)) {
        verifCity = true;
        cityErrorMessage.innerText = "";
    }

    else {
        verifCity = false;
        cityErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

email.addEventListener("change", function () {
    let emailErrorMessage = document.getElementById("emailErrorMsg");



    if (emailRegex.test(email.value)) {
        verifEmail = true;
        emailErrorMessage.innerText = "";

    }

    else {
        verifEmail = false;
        emailErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

// Récupération du bouton commander
boutonCommander = document.getElementById("order");

// Ecoute du bouton commander
boutonCommander.addEventListener("click", (event) => {
    event.preventDefault();


    // Si les tests regex sont bons, récupérer les id dans le panier et les infos dans les champs du formulaire, et créer l'ensemble à envoyer
    if (verifFirstName && verifLastName && verifAddress && verifCity && verifEmail) {

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

            })

    }

    // Si les champs du formulaire ne sont pas bien remplis
    else {
        window.alert("Veuillez remplir les champs du formulaire correctement");
    }
}
)