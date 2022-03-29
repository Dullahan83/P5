
document.getElementById("firstName").setAttribute("pattern", "[a-zA-Z-]{3,}");
document.getElementById("firstName").setAttribute("minlength", 3);
document.getElementById("lastName").setAttribute("pattern", "[a-zA-Z-]{3,}");
document.getElementById("lastName").setAttribute("minlength", 3);
document.getElementById("city").setAttribute("pattern", "[a-zA-Z- ]{3,}");
document.getElementById("city").setAttribute("minlength", 4);


//Verifie la validité de la totalité du formulaire
document.querySelector("#order").addEventListener("click", (e)=>{
    e.preventDefault();
    const inputs = document.querySelectorAll(".cart__order__form input");
    let isFormValid = true;
    for(let input of inputs){
        isFormValid &= checkValidity(input);
        if(!isFormValid){
            break;
        }
    }
    if(isFormValid){
        contactList.push(createCustomer())
        submitCommand(createCustomer())
        localStorage.clear();
    }
});

function checkValidity(input){
    return input.checkValidity();
}

function createCustomer(){
    let firstName = document.getElementById("firstName").value;
    let lastName= document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    let contact = new Customer(firstName, lastName, address, city, email);
    return contact;
}

const fieldList = document.querySelectorAll("input")
for (const field of fieldList) {
    field.addEventListener("change", function(e){
        if(field.validity.tooShort){
            field.nextElementSibling.innerHTML = "C'est trop court ! Vous avez dû l'entendre souvent celle là"
        }
        else if(field.validity.patternMismatch){
            field.nextElementSibling.innerHTML = "Le champ contient des caractères interdits"
        }
        else{
            field.nextElementSibling.innerHTML = ""
        }
    })
}

function submitCommand(contact){
    const jsonBody = {                          
        contact: {...contact},
        products:[]
    };
    const cart = getCart();
    for (const item of cart) {
        jsonBody.products.push(item.id)
    }
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(data => window.location.href="http://127.0.0.1:5502/front/html/confirmation.html" + "?" + data.orderId) 
}