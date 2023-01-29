
const sectionItems = document.getElementById('items');

fetch('http://localhost:3000/api/Products/')
    .then((response) => {
        return response.json();
        // afficherProducts(response.json());
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {

            const linkItems = document.createElement("a")
            linkItems.href = "./product.html?id=${data[i]._id}"
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

            // sectionItems.innerHTML +=
            //     `<a href="./product.html?id=${data[i]._id}">
            //     <article>
            //     <img src="${data[i].imageUrl}"</img>
            //     <h3 class="productName">${data[i].name}</h3>
            //      <p class="productDescription">${data[i].description}</p>
            //      </article>
            //     </a>`;

        };
    });






// function getProducts() {
//     fetch('http://localhost:3000/api/Products/')

//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             return (products = data);
//         });
// };




// function afficherProducts() {

//     products = response.json();
//     for (let i = 0; i < products.length; i++) {

//         sectionItems.innerHTML +=
//             `<a href="./product.html?id=${products[i]._id}">
//             <article>
//                 <img src="${products[i].imageUrl}"</img>
//                 <h3 class="productName">${products[i].name}</h3>
//                 <p class="productDescription">${products[i].description}</p>
//              </article>
//             </a>`;

//     };


// }

// afficherProducts();


  //     .then((products) => { })

    // function postElement(product) {
    //     const anchorElement = document.createElement('a');
    //     anchorElement.setAttribute('href', `http://localhost:3000/api/Products/{product._id}`)
    // }