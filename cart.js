let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


const cartProducts =
    document.getElementById(
        "cartProducts"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const emptyCart =
    document.getElementById(
        "emptyCart"
    );


const checkoutBox =
    document.getElementById(
        "checkoutBox"
    );


// Display cart

function displayCart() {

    cartProducts.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

        checkoutBox.style.display =
            "none";

        return;

    }


    emptyCart.style.display =
        "none";


    checkoutBox.style.display =
        "block";


    let total = 0;


    cart.forEach(
        function(item, index) {

            const quantity =
                item.quantity || 1;


            const itemTotal =
                Number(item.price) *
                quantity;


            total += itemTotal;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "food-card";


            card.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="food-image"
                >

                <div class="food-content">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        R${Number(item.price).toFixed(2)}
                        each
                    </p>

                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:15px;
                            margin-bottom:15px;
                        "
                    >

                        <button
                            onclick="decreaseQuantity(${index})"
                            class="cart-btn"
                        >
                            −
                        </button>

                        <strong>
                            ${quantity}
                        </strong>

                        <button
                            onclick="increaseQuantity(${index})"
                            class="cart-btn"
                        >
                            +
                        </button>

                    </div>

                    <p>
                        Item Total:
                        R${itemTotal.toFixed(2)}
                    </p>

                    <button
                        class="btn"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>
            `;


            cartProducts.appendChild(
                card
            );

        }
    );


    cartTotal.textContent =
        total.toFixed(2);

}


// Increase quantity

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}


// Decrease quantity

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove product

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Save cart

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Start

displayCart();