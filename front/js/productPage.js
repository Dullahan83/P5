let url = new URL(window.location.href);
let id = url.search.replace(/^./,"");  /* To get the Id of the product */

fetch("http://localhost:3000/api/products" + "/" + id)
.then(data => data.json())
.then(product => {
    document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    let select = document.getElementById("colors");
    for(let color of product.colors){
        let option = document.createElement("option");
        option.innerHTML = color;
        select.appendChild(option);
    }
    document.getElementById("addToCart").addEventListener("click",function(){
        const basketProduct = {
            "id": product._id,
            "color": document.getElementById("colors").value,
            "quantity": parseInt(document.getElementById("quantity").value),
            "price": product.price
        };
        addToCart(basketProduct);
    });
});

