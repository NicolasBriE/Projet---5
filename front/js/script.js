
const sectionItems = document.getElementById('items');

fetch('http://localhost:3000/api/Products/')
    .then((response) => {
        return response.json();
    })

    .then((data) => {

        for (let i = 0; i < data.length; i++) {

            const linkItems = document.createElement("a")
            linkItems.href = `./product.html?id=${data[i]._id}`
            sectionItems.appendChild(linkItems)

            const articleItems = document.createElement("article")
            articleItems.innerHTML = ``
            linkItems.appendChild(articleItems)

            const imageItems = document.createElement("img")
            imageItems.src = data[i].imageUrl
            imageItems.alt = data[i].altTxt
            articleItems.appendChild(imageItems)

            const nameItems = document.createElement("h3")
            nameItems.innerText = data[i].name
            articleItems.appendChild(nameItems)

            const descriptionItems = document.createElement("p")
            descriptionItems.innerText = data[i].description
            articleItems.appendChild(descriptionItems)


        };
    });

