//récupère la liste des produits
fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(jsonListProduct =>{
    for(let jsonProduct of jsonListProduct){
        let product = new Product(jsonProduct);
            document.querySelector(".items").innerHTML += `<a href="./product.html?${product._id}">
                                                                <article>
                                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                    <h3 class="productName">${product.name}</h3>
                                                                    <p class="productDescription">${product.description}</p>
                                                                </article>
                                                            </a>`
        /* displayHomeProducts(product); */
    }
});

getTotalCartItems();


//Au cas où le principe d'injection de template avec interpolation est refusé
/* function displayHomeProducts(product) {
    let codePlace = document.getElementById("items");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `./product.html?${product._id}`);
    codePlace.appendChild(anchor);

    const article = document.createElement("article");
    anchor.appendChild(article);

    const articleImg = document.createElement("img");
    articleImg.setAttribute("src", product.imageUrl);
    articleImg.setAttribute("alt", product.altTxt );
    article.appendChild(articleImg);
    console.log(articleImg)

    const articleTitle = document.createElement("h3");
    articleTitle.setAttribute("class", "productName");
    articleTitle.textContent = product.name;
    article.appendChild(articleTitle);
    
    const articleDescription = document.createElement("p");
    articleDescription.setAttribute("class", "producDescription");
    articleDescription.textContent = product.description;
    article.appendChild(articleDescription);
} */