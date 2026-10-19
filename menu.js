// Get products saved by the admin

let products =
    JSON.parse(localStorage.getItem("products")) || [];

const productsContainer =
    document.getElementById("productsContainer");


// If there are no products

if (products.length === 0) {

    productsContainer.innerHTML = `
        <p style="
            color:#666;
            text-align:center;
            width:100%;
        ">
            No products available yet.
        </p>
    `;

}


// Display products

products.forEach(function(product) {

    const card = document.createElement("div");

    card.className = "food-card";

    card.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            class="food-image"
        >

        <div class="food-content">

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <div class="price-cart">

                <span class="price">
                    R${Number(product.price).toFixed(2)}
                </span>

                <button
                    class="cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add To Cart
                </button>

            </div>

        </div>
    `;

    productsContainer.appendChild(card);

});


// Add product to cart

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {

        alert("Product not found.");

        return;

    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            description: product.description,

            price: Number(product.price),

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " has been added to your cart!"
    );

}