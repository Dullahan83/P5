//Récupère l'orderId puis l'affiche dans la confirmation de commande
let url = new URL(window.location.href);
document.getElementById("orderId").textContent = url.search.replace(/^./,"")