let panier = JSON.parse(localStorage.getItem("panier"))
console.log(panier)

const cartItems = document.getElementById('cart__items')

fetch('http://localhost:3000/api/Products/')
    .then((response) => {
        return response.json();
        // afficherProducts(response.json());
    })

    .then((data) => {

        for (let i = 0; i < panier.length; i++) {

            // for (let i = 0; i < panier.length; i++) {

            const details = data.find((element) => element._id === panier[i].id);

            const cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            cartItem.setAttribute("data-id", panier[i].id)
            cartItem.setAttribute("data-color", panier[i].couleur)
            cartItems.appendChild(cartItem);

            const cartItemImg = document.createElement("div");
            cartItemImg.className = "cart__item__img";
            cartItem.appendChild(cartItemImg);

            const imageItems = document.createElement("img");
            imageItems.src = details.imageUrl;
            imageItems.alt = details.altTxt;
            cartItemImg.appendChild(imageItems);

            const cartItemContent = document.createElement("div");
            cartItemContent.className = "cart__item__content";
            cartItem.appendChild(cartItemContent);

            const cartItemContentDescription = document.createElement("div");
            cartItemContentDescription.className = "cart__item__content__description";
            cartItemContent.appendChild(cartItemContentDescription);

            const nomItem = document.createElement("h2");
            nomItem.innerText = details.name;
            cartItemContentDescription.appendChild(nomItem);

            const couleurItem = document.createElement("p");
            couleurItem.innerText = panier[i].couleur;
            cartItemContentDescription.appendChild(couleurItem);

            const prixItem = document.createElement("p");
            prixItem.innerText = details.price + "€";
            cartItemContentDescription.appendChild(prixItem);

            const cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.className = "cart__item__content__settings";
            cartItemContent.appendChild(cartItemContentSettings);

            const cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            const quantite = document.createElement("p");
            quantite.innerText = "Qté";
            cartItemContentSettingsQuantity.appendChild(quantite);

            const quantiteInput = document.createElement("input");
            quantiteInput.setAttribute("type", "number");
            quantiteInput.setAttribute("class", "itemQuantity");
            quantiteInput.setAttribute("name", "itemQuantity");
            quantiteInput.addEventListener("change", function () {
                if (quantiteInput.value >= 1 && quantiteInput.value <= 100) {
                    let modifQuant = panier.find(element => element.id === cartItem.dataset.id && element.couleur === cartItem.dataset.color);
                    modifQuant.quantite = quantiteInput.value;
                    console.log(panier);
                    localStorage.setItem("panier", JSON.stringify(panier));
                    calculs();
                }

                else if (quantiteInput.value == 0) {
                    let deleteProd = panier.find(element => element.id === cartItem.dataset.id && element.couleur === cartItem.dataset.color);
                    let index = panier.indexOf(deleteProd);
                    panier.splice(index, 1);
                    // console.log(deleteProd);
                    console.log(index);
                    // panier.filter(element => element != deleteProd);
                    // for (i = 0; i < panier.length; i++) {
                    //     if (panier[i] === deleteProd) {
                    //         panier.splice(i, 1);
                    //         console.log(panier);
                    //     }
                    // }
                    console.log(panier);
                    localStorage.setItem("panier", JSON.stringify(panier));
                    calculs();
                    cartItem.remove();
                    console.log(cartItem);
                    window.alert("Ce produit a été supprimé du panier.")
                }

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

            const boutonSupprimer = document.createElement("p");
            boutonSupprimer.className = "deleteItem";
            boutonSupprimer.textContent = "Supprimer";
            boutonSupprimer.addEventListener("click", function () {
                console.log(cartItem.getAttribute("data-id"));
                for (let i = 0; i < panier.length; i++) {
                    if (panier[i].id === cartItem.getAttribute("data-id") && panier[i].couleur === cartItem.getAttribute("data-color")) {
                        panier.splice(i, 1);
                        console.log(panier);
                        localStorage.setItem("panier", JSON.stringify(panier));
                        calculs();
                    }
                }
                cartItem.remove();
                window.alert("Ce produit a été supprimé du panier.")
            })
            cartItemContentSettingsDelete.appendChild(boutonSupprimer);

        }

        function calculs() {
            let totalQte = 0;
            let totalPrix = 0;

            for (i = 0; i < panier.length; i++) {
                totalQte += Number(panier[i].quantite);
                const details = data.find((element) => element._id === panier[i].id);
                totalPrix += (details.price) * (panier[i].quantite);
            }

            console.log(totalQte);
            console.log(totalPrix);

            const totalQuantite = document.getElementById("totalQuantity");
            totalQuantite.innerText = totalQte;

            const calculPrix = document.getElementById("totalPrice");
            calculPrix.innerText = totalPrix;

        }

        calculs();
    })



let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

let nameRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
let addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
let emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

let verifFirstName;
let verifLastName;
let verifAddress;
let verifCity;
let verifEmail;

firstName.addEventListener("change", function () {
    let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");



    if (nameRegex.test(firstName.value)) {
        verifFirstName = true;
        console.log(verifFirstName);
        firstNameErrorMessage.innerText = "";
    }

    else {
        verifFirstName = false;
        console.log(verifFirstName);
        firstNameErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }

})

lastName.addEventListener("change", function () {
    let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");



    if (nameRegex.test(lastName.value)) {
        verifLastName = true;
        console.log(verifLastName);
        lastNameErrorMessage.innerText = "";
    }

    else {
        verifLastName = false;
        console.log(verifLastName);
        lastNameErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

address.addEventListener("change", function () {
    let addressErrorMessage = document.getElementById("addressErrorMsg");



    if (addressRegex.test(address.value)) {
        verifAddress = true;
        console.log(verifAddress);
        addressErrorMessage.innerText = "";
    }

    else {
        verifAddress = false;
        console.log(verifAddress);
        addressErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

city.addEventListener("change", function () {
    let cityErrorMessage = document.getElementById("cityErrorMsg");



    if (addressRegex.test(city.value)) {
        verifCity = true;
        console.log(verifCity);
        cityErrorMessage.innerText = "";
    }

    else {
        verifCity = false;
        console.log(verifCity);
        cityErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

email.addEventListener("change", function () {
    let emailErrorMessage = document.getElementById("emailErrorMsg");



    if (emailRegex.test(email.value)) {
        verifEmail = true;
        console.log(verifEmail);
        emailErrorMessage.innerText = "";

    }

    else {
        verifEmail = false;
        console.log(verifEmail);
        emailErrorMessage.innerText = "Veuillez remplir le champ correctement.";
    }
})

boutonCommander = document.getElementById("order");


boutonCommander.addEventListener("click", function () {
    if (verifFirstName && verifLastName && verifAddress && verifCity && verifEmail) {

        let idList = []

        for (let i = 0; i < panier.length; i++) {
            idList.push(panier[i].id)
        }
        console.log(idList)

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

        let envoiCommande = {
            method: 'POST',
            body: JSON.stringify(commande),
            headers: { 'Content-Type': 'application/json' }
        }
        console.log(envoiCommande);

        fetch(`http://localhost:3000/api/Products/order`, envoiCommande)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                window.location.assign(`./confirmation.html?orderId=${data.orderId}`)

            })

    }
})