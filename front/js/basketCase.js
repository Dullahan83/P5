
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart(){
    const cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart).sort();
    }
}

function addToCart(basketProduct){
    const cart = getCart();
    const foundProduct = cart.find(p => ((p.id === basketProduct.id) && (p.color === basketProduct.color)));
    if(foundProduct){
        foundProduct.quantity += parseInt(basketProduct.quantity);
        }
    else if(document.getElementById("quantity").value <= 0){
        document.getElementById("quantity").value = 1;
    }
    else{
        cart.push(basketProduct);
    }
    saveCart(cart);
}

function deleteFromCart(id, color, path, productPrice){
    let cart = getCart()
    cart = cart.filter(p => p.id !== id || p.color !== color)
    saveCart(cart)
    path.remove()
    getTotalCartItems()
    getTotalCartPrice(productPrice)
}

function getTotalCartItems(){
    const cart = getCart();
    let total = 0;
    for (const item of cart) {
        total += parseInt(item.quantity)
    }
    document.getElementById("totalQuantity").innerHTML = total;
}

function changeQuantity(btnPath, id, color, productPrice){
    const cart = getCart();
    for (let item of cart) {
        const foundProduct = cart.find(p => ((p.id === id) && (p.color === color)));
        if(foundProduct){
            foundProduct.quantity = btnPath.value
        }
        saveCart(cart)
    }
    getTotalCartItems()
    getTotalCartPrice(productPrice)
}

function getTotalCartPrice(productPrice){
    const cart = getCart();
    let totalPrice = 0;
    for (const item of cart) {
        totalPrice += parseInt(item.quantity) * parseInt(productPrice)
    }
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

function getDeleteBtnList(productPrice){
    const btnDeleteList= document.querySelectorAll(".deleteItem")
    btnDeleteList.forEach((btn) => {
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        let path = btn.closest(".cart__item");
        btn.addEventListener("click", function(e){
            
            deleteFromCart(id, color, path, productPrice);
        })
    });
}

function getQuantityBtnList(productPrice){
    const quantityBtnList= document.querySelectorAll(".itemQuantity")
    quantityBtnList.forEach((btn) =>{
        let btnPath = btn.closest(".itemQuantity")
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        btn.addEventListener("input", function(e){
            
            changeQuantity(btnPath, id, color, productPrice);
        })
    });
}