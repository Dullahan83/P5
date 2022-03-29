let url = new URL(window.location.href);
document.getElementById("orderId").innerHTML = url.search.replace(/^./,"")