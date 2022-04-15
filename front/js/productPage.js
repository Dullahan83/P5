let url = new URL(window.location.href);
//Recupère l'id du produit
let id = url.search.replace(/^./,"");                   


//Récupere les données de notre produit
fetch("http://localhost:3000/api/products" + "/" + id)
.then(data => data.json())
.then(product => {
    document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    
    //Au cas où le principe d'injection de template avec interpolation est refusé
    /* const imgCodePath = document.querySelector(".item__img");
    const articleImg = document.createElement("img");
    articleImg.setAttribute("src", product.imageUrl);
    articleImg.setAttribute("alt", product.altTxt );
    imgCodePath.appendChild(articleImg); */

    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    let select = document.getElementById("colors");
    for(let color of product.colors){
        //Ajoute les couleurs au menu de selection                   
        let option = document.createElement("option");
        option.innerHTML = color;
        select.appendChild(option);
    }

//Ajoute un eventListener au bouton ajouter au panier
    document.getElementById("addToCart").addEventListener("click",function(){
        //Crée le template de notre produit à ajouter au panier
        const basketProduct = {
            "id": product._id,
            "color": document.getElementById("colors").value,
            "quantity": parseInt(document.getElementById("quantity").value),
        };
        addToCart(basketProduct);
    });
});
getTotalCartItems();



