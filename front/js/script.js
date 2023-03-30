
const sectionItems = document.getElementById('items');
// Récupération des données
fetch('http://localhost:3000/api/Products/')
    .then((response) => {
        return response.json();
    })

    .then((data) => {

        for (let i = 0; i < data.length; i++) {
            // Création du lien
            const linkItems = document.createElement("a")
            linkItems.href = `./product.html?id=${data[i]._id}`
            sectionItems.appendChild(linkItems)
            // Création de la div article
            const articleItems = document.createElement("article")
            articleItems.innerHTML = ``
            linkItems.appendChild(articleItems)
            // Création de l'image
            const imageItems = document.createElement("img")
            imageItems.src = data[i].imageUrl
            imageItems.alt = data[i].altTxt
            articleItems.appendChild(imageItems)
            // Création du titre
            const nameItems = document.createElement("h3")
            nameItems.innerText = data[i].name
            articleItems.appendChild(nameItems)
            // Création de la description
            const descriptionItems = document.createElement("p")
            descriptionItems.innerText = data[i].description
            articleItems.appendChild(descriptionItems)


        };
    });

