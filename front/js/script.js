
fetch('http://localhost:3000/api/Products/')
    .then(response => console.table(response.json()))

async function getProducts() {
    await fetch('http://localhost:3000/api/Products/')

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return (products = data);
        });
};


const sectionItems = document.getElementById('items');

async function afficherProducts() {

    await getProducts();
    for (let i = 0; i < products.length; i++) {

        sectionItems.innerHTML +=
            `<a href="./product.html?id=${products[i]._id}">
    <article>
        <img src="${products[i].imageUrl}"</img>
        <h3 class="productName">${products[i].name}</h3>
        <p class="productDescription">${products[i].description}</p>
    </article>
    </a>`;
    };


}

afficherProducts();


  //     .then((products) => { })

    // function postElement(product) {
    //     const anchorElement = document.createElement('a');
    //     anchorElement.setAttribute('href', `http://localhost:3000/api/Products/{product._id}`)
    // }