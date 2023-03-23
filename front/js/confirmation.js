let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let recupOrderId = params.get("orderId");
console.log(recupOrderId);

let orderId = document.getElementById("orderId")
orderId.innerText = recupOrderId;