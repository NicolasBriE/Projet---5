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


        }
    })
