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

        // const imageItem = document.createElement("img")
        // imageItem.src = data.imageUrl
        // articleItem.appendChild(imageItem)
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











