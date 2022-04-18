//Ajoute nos patterns
document.getElementById("firstName").setAttribute("pattern", "[\\p{L}-]+");
document.getElementById("firstName").setAttribute("minlength", 3);
document.getElementById("lastName").setAttribute("pattern", "[\\p{L}-]+");
document.getElementById("lastName").setAttribute("minlength", 3);
document.getElementById("city").setAttribute("pattern", "[\\p{L}-]+");
document.getElementById("city").setAttribute("minlength", 4);

//Verifie la validité de la totalité du formulaire
document.querySelector("#order").addEventListener("click", (e)=>{
    e.preventDefault();
    const inputs = document.querySelectorAll(".cart__order__form input");
    let isFormValid = true;
    for(let input of inputs){
        isFormValid &= checkValidity(input);
        if(!isFormValid){
            switch (input.id){
                case 'firstName':
                    input.nextElementSibling.textContent = "Veuillez renseigner votre Prénom s'il vous plaît";
                    break;
                case 'lastName':
                    input.nextElementSibling.textContent = "Veuillez renseigner votre Nom s'il vous plaît";
                    break;
                case 'address':
                    input.nextElementSibling.textContent = "Veuillez renseigner votre Adresse s'il vous plaît";
                    break;
                case 'city':
                    input.nextElementSibling.textContent = "Veuillez renseigner votre Ville s'il vous plaît";
                    break;
                case 'email':
                    input.nextElementSibling.textContent = "Veuillez renseigner votre Email s'il vous plaît";
                    break;
                default:
                    break;
            }
            break;
        }
    }
    if(isFormValid){
        if(cart.length === 0){
            alert("Le panier est vide")
        }
        else{
            contactList.push(createCustomer())
            submitCommand(createCustomer())
            localStorage.clear();
        }
    }
});

//Vérifie la validité d'un champ
function checkValidity(input){
    return input.checkValidity();
}

//Crée une fiche client
function createCustomer(){
    let firstName = document.getElementById("firstName").value;
    let lastName= document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    let contact = new Customer(firstName, lastName, address, city, email);
    return contact;
}

//Change le message d'erreurs en fonction des cas
const fieldList = document.querySelectorAll("input")
for (const field of fieldList) {
    field.addEventListener("change", function(e){
        if(field.validity.tooShort){
            field.nextElementSibling.textContent = "C'est trop court ! Vous avez dû l'entendre souvent celle là"
        }
        else if(field.validity.patternMismatch){
            if (field.id === "city") {
                field.nextElementSibling.textContent = "Nous n'avons pas besoin du code postal. Veuillez n'entrer que le nom de la ville"
            }
            else {
            field.nextElementSibling.textContent = "Le champ contient des caractères interdits, merci de n'utiliser que des lettres"
            }
        }
        else{
            field.nextElementSibling.textContent = ""
        }
    })
}

function submitCommand(contact){
    //Défini le format de notre requète pour qu'il soit conforme aux spécificité de l'api
    const jsonBody = {                          
        contact: {...contact},
        products:[]
    };
    const cart = getCart();
    //Envoie chaque item de notre panier sur le "bon de commande"
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
    //Passe notre numéro de commande en paramètre de l'adresse de confirmation et nous redirige sur la page de confirmation
    .then(data => window.location.href = getUrl() + "/front/html/confirmation.html" + "?" + data.orderId) 
}