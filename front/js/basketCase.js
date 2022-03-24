
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

function deleteFromCart(id, color, path){
    let cart = getCart()
    /* let length= cart.length */
    cart = cart.filter(p => p.id !== id || p.color !== color)
    /* for (let i = length - 1; i >=0; i--) {
        if( cart[i].id === id &&  cart[i].color === color){
            cart.splice(i,1)
        }
        saveCart(cart)
    } */
    saveCart(cart)
    path.remove()
    getTotalCartItems()
    getTotalCartPrice()
}

function getTotalCartItems(){
    const cart = getCart();
    let total = 0;
    for (const item of cart) {
        total += parseInt(item.quantity)
    }
    document.getElementById("totalQuantity").innerHTML = total;
}

function changeQuantity(btnPath, id, color){
    const cart = getCart();
    for (let item of cart) {
        const foundProduct = cart.find(p => ((p.id === id) && (p.color === color)));
        if(foundProduct){
            foundProduct.quantity = btnPath.value
        }
        saveCart(cart)
    }
    getTotalCartItems()
    getTotalCartPrice()
}

function getTotalCartPrice(){
    const cart = getCart();
    let totalPrice = 0;
    for (const item of cart) {
        totalPrice += parseInt(item.quantity) * parseInt(item.price)
    }
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

function getDeleteBtnList(){
    const btnDeleteList= document.querySelectorAll(".deleteItem")
    btnDeleteList.forEach((btn) => {
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        let path = btn.closest(".cart__item");
        btn.addEventListener("click", function(e){
            
            deleteFromCart(id, color, path);
        })
    });
}

function getQuantityBtnList(){
    const quantityBtnList= document.querySelectorAll(".itemQuantity")
    quantityBtnList.forEach((btn) =>{
        let btnPath = btn.closest(".itemQuantity")
        let id = btn.closest(".cart__item").dataset.id;
        let color = btn.closest(".cart__item").dataset.color;
        btn.addEventListener("input", function(e){
            
            changeQuantity(btnPath, id, color);
        })
    });
}