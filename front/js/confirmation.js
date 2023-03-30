let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let recupOrderId = params.get("orderId");

let orderId = document.getElementById("orderId")
orderId.innerText = recupOrderId;