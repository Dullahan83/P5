
//Enregiste le panier dans le localStorage
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Récupère le panier enregisté dans le localStorage
function getCart(){
    const cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

//Ajoute un produit au panier
function addToCart(basketProduct){
    const cart = getCart();
    const foundProduct = cart.find(p => ((p.id === basketProduct.id) && (p.color === basketProduct.color)));
    //Si la quantité est égale à 0, on la passe automatiquement à 1
    if(document.getElementById("quantity").value <= 0){
        document.getElementById("quantity").value = 1;
        changeBtnColor("red")
        setTimeout(resetBtnColor, 500)
    }

    else if(document.getElementById("colors").value === ""){
        changeBtnColor("red")
        setTimeout(resetBtnColor, 500)
    }

    else if(foundProduct && document.getElementById("colors").value != null){
        foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(basketProduct.quantity);
        changeBtnColor("lightGreen")
        setTimeout(resetBtnColor, 500)
    }
    
    else{
        cart.push(basketProduct);
        changeBtnColor("lightGreen")
        setTimeout(resetBtnColor, 500)
    }
    saveCart(cart);
    getTotalCartItems();
}

//Supprime un objet du panier et du dom
function deleteFromCart(id, color, path){
    let cart = getCart()
    //Supprime du panier
    cart = cart.filter(p => p.id !== id || p.color !== color)
    saveCart(cart)
    //Supprime du dom
    path.remove()
    getTotalCartItems()
    getTotalCartPrice()
}

//Récupère le nombre total d'objets présents dans le panier
function getTotalCartItems(){
    const cart = getCart();
    let total = 0;
    for (const item of cart) {
        total += parseInt(item.quantity)
    }
    if(window.location.href === getUrl() + "/front/html/cart.html"){
        document.getElementById("totalQuantity").textContent = total;
        if(total === 0){
            document.querySelector(".limitedWidthBlock nav ul").lastElementChild.querySelector("li").textContent =  `Panier`
        }
        else{
            document.querySelector(".limitedWidthBlock nav ul").lastElementChild.querySelector("li").textContent =  `Panier (${total})`
        }
    }
    else if(total === 0){
        document.querySelector(".limitedWidthBlock nav ul").lastElementChild.querySelector("li").textContent =  `Panier`
    }
    else{
        document.querySelector(".limitedWidthBlock nav ul").lastElementChild.querySelector("li").textContent =  `Panier (${total})`
    }
}

//Change la quantité d'un objet présent dans le panier
function changeQuantity(btnPath, id, color, productPrice){
    const cart = getCart();
    let productQuantityPrice = 0;
    for (let item of cart) {
        const foundProduct = cart.find(p => ((p.id === id) && (p.color === color)));
        if(foundProduct){
            foundProduct.quantity = btnPath.value
            productQuantityPrice = parseInt(foundProduct.quantity) * parseInt(productPrice)
        }
        saveCart(cart)
    }
    getTotalCartItems()
    getTotalCartPrice()
}

//Calcule le prix total des objets présents dans le panier
function getTotalCartPrice(){
    const cart = getCart();
    let quantities = document.querySelectorAll(".itemQuantity")
    let prices = document.querySelectorAll(".cart__item__content__description")
    let cartPrice = 0;
    for(i=0;i<prices.length;i++){
        cartPrice += parseInt(prices[i].lastElementChild.textContent) * quantities[i].value;
    }
    document.getElementById("totalPrice").textContent = cartPrice
    saveCart(cart)
}

//Récupère la liste des boutons supprimer
function getDeleteBtnList(){
    const btnDeleteList= document.querySelectorAll(".deleteItem")
    btnDeleteList.forEach((btn) => {
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        let path = btn.closest(".cart__item");
        let productPrice = btn.closest(".cart__item").querySelector(".cart__item__content__description").lastElementChild.textContent
        btn.addEventListener("click", function(e){
            deleteFromCart(id, color, path, productPrice);
        })
    });
}

//Récupère la liste des boutons de changement de quantité
function getQuantityBtnList(){
    const quantityBtnList= document.querySelectorAll(".itemQuantity")
    quantityBtnList.forEach((btn) =>{
        let btnPath = btn.closest(".itemQuantity")
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        let productPrice = btn.closest(".cart__item").querySelector(".cart__item__content__description").lastElementChild.innerHTML
        btn.addEventListener("input", function(e){
            
            changeQuantity(btnPath, id, color, productPrice);
        })
    });
}

//Récupère l'url de l'hôte
function getUrl(){
    var url = window.location.href;
    return url.slice(0, url.indexOf('/front'));
}

//Ajoute un indicateur visuel lors de l'jout d'un produit au panier en changeant la couleur de police
function changeBtnColor(color){
    document.getElementById("addToCart").style.color = color;
}

//Remet la couleur de police du bouton en blanc
function resetBtnColor(){
    const btn = document.getElementById("addToCart");
    btn.style.color = "white"
}