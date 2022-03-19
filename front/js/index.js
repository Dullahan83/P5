fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(jsonListProduct =>{
    console.log(jsonListProduct);
    for(let jsonProduct in jsonListProduct){
        let product = new Product(jsonProduct);
            document.querySelector(".items").innerHTML += `<article>
                                                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                <h3 class="productName">${product.name}</h3>
                                                                <p class="productDescription">${product.description}</p>
                                                            </article>`
            console.log(product);
    }
});