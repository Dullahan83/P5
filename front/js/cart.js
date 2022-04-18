const cart = getCart()

//Trie le panier par id
function sortArray(x, y){
    return x.id.localeCompare(y.id)
}
const sortedCart = cart.sort(sortArray)

//récupère et affiche les produits mis dans le panier si nous sommes sur la page panier
if(window.location.href === getUrl() + "/front/html/cart.html"){
    for(let item of sortedCart){
        fetch("http://localhost:3000/api/products" + "/" + item.id)
        .then(data => data.json())
        .then(product =>{
            document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${product.name}</h2>
                                                                            <p>${item.color}</p>
                                                                            <p>${product.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                                <p>Qté : </p>
                                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                                <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </article>`
                                                            
                                                            getDeleteBtnList();
                                                            getQuantityBtnList();
                                                            getTotalCartItems();
                                                            getTotalCartPrice();
                                                            /* displayCartProducts(item, product); */
                                                            
        })
    }
}


//Au cas où le principe d'injection de template avec interpolation est refusé
/* function displayCartProducts(item, product){
    const path = document.getElementById("cart__items");
    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", item.id);
    article.setAttribute("data-color", item.color);
    path.appendChild(article);

    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "cart__item__img");
    article.appendChild(imgContainer);

    const articleImg = document . createElement("img");
    articleImg.setAttribute("src", product.imageUrl);
    articleImg.setAttribute("alt", product.altTxt);
    imgContainer.appendChild(articleImg);

    const articleContentContainer = document.createElement("div");
    articleContentContainer.setAttribute("class", "cart__item__content");
    article.appendChild(articleContentContainer);

    const articleDescription = document.createElement("div");
    articleDescription.setAttribute("class", "cart__item__content__description");
    articleContentContainer.appendChild(articleDescription);

    const itemName = document.createElement("h2");
    itemName.textContent = product.name;
    articleDescription.appendChild(itemName);
    
    const itemColor = document.createElement("p");
    itemColor.textContent = item.color;
    articleDescription.appendChild(itemColor);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = product.price;
    articleDescription.appendChild(itemPrice);

    const articleParams = document.createElement("div");
    articleParams.setAttribute("class", "cart__item__content__settings");
    articleContentContainer.appendChild(articleParams);

    const quantitySettings = document.createElement("div");
    quantitySettings.setAttribute("class", "cart__item__content__settings__quantity");
    articleParams.appendChild(quantitySettings);

    const quantity = document.createElement("p");
    quantity.textContent = "Qté :";
    quantitySettings.appendChild(quantity);

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", item.quantity);
    quantitySettings.appendChild(inputQuantity);

    const deleteContainer = document.createElement("div");
    deleteContainer.setAttribute("class","cart__item__content__settings__delete");
    articleParams.appendChild(deleteContainer);

    const deleteBtn = document.createElement("p");
    deleteBtn.setAttribute("class", "deleteItem");
    deleteBtn.textContent = "Supprimer";
    deleteContainer.appendChild(deleteBtn);
}  */  