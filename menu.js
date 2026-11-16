import { db } from "../../firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const productsContainer = document.getElementById("productsContainer");

let products = [];


// Display messages on the menu page
function showMessage(message) {

    productsContainer.replaceChildren();

    const paragraph = document.createElement("p");

    paragraph.textContent = message;

    paragraph.style.cssText =
        "color:#666;text-align:center;width:100%;";

    productsContainer.appendChild(paragraph);
}


// Load active products from Firebase Firestore
async function loadProducts() {

    showMessage("Loading menu...");

    try {

        const productsQuery = query(
            collection(db, "products"),
            where("active", "==", true)
        );

        const snapshot = await getDocs(productsQuery);

        products = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data()
        }));

        if (products.length === 0) {

            showMessage("No products available yet.");

            return;
        }

        displayProducts();

    } catch (error) {

        console.error("Error loading products:", error);

        showMessage(
            "We couldn't load the menu. Please try again later."
        );
    }
}


// Display products on the menu page
function displayProducts() {

    productsContainer.replaceChildren();

    products.forEach((product) => {

        const card = document.createElement("div");

        card.className = "food-card";


        // Product image
        const image = document.createElement("img");

        image.src = product.image || "";

        image.alt = product.name || "Menu item";

        image.className = "food-image";

        image.onerror = () => {
            image.style.display = "none";
        };


        // Product content
        const content = document.createElement("div");

        content.className = "food-content";


        // Product name
        const name = document.createElement("h3");

        name.textContent = product.name || "Unnamed product";


        // Product description
        const description = document.createElement("p");

        description.textContent = product.description || "";


        // Price and cart section
        const priceCart = document.createElement("div");

        priceCart.className = "price-cart";


        // Product price
        const price = document.createElement("span");

        price.className = "price";

        price.textContent =
            `R${Number(product.price).toFixed(2)}`;


        // Add To Cart button
        const button = document.createElement("button");

        button.className = "cart-btn";

        button.textContent = "Add To Cart";

        button.addEventListener("click", () => {

            addToCart(product.id);

        });


        priceCart.append(price, button);

        content.append(name, description, priceCart);

        card.append(image, content);

        productsContainer.appendChild(card);

    });
}


// Add products to cart
function addToCart(productId) {

    const product = products.find(
        (item) => item.id === productId
    );

    if (!product) {

        showCartNotification(
            "Product not found.",
            true
        );

        return;
    }


    // Get existing cart
    let cart = [];

    try {

        cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch {

        cart = [];

    }


    // Check whether product is already in cart
    const existingProduct = cart.find(
        (item) => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            description: product.description || "",

            price: Number(product.price),

            image: product.image || "",

            quantity: 1

        });

    }


    // Save updated cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Display popup notification
    showCartNotification(
        `${product.name} has been added to your cart!`
    );

}


// ==========================================
// ADD TO CART POPUP NOTIFICATION
// ==========================================

let toastTimer;
let toastRemoveTimer;

function showCartNotification(message, isError = false) {

    // Remove previous notification
    const existingToast =
        document.querySelector(".cart-toast");

    if (existingToast) {
        existingToast.remove();
    }

    clearTimeout(toastTimer);
    clearTimeout(toastRemoveTimer);


    // Create popup notification
    const toast = document.createElement("div");

    toast.className = "cart-toast";

    toast.textContent =
        (isError ? "✕ " : "✓ ") + message;

    toast.setAttribute("role", "status");

    toast.setAttribute("aria-live", "polite");


    // Popup styling
    Object.assign(toast.style, {

        position: "fixed",

        top: "90px",

        right: "25px",

        backgroundColor: "#181c21",

        color: "#ffffff",

        padding: "16px 24px",

        borderLeft:
            "4px solid " +
            (isError ? "#ff1645" : "#27c982"),

        borderRadius: "8px",

        fontSize: "13px",

        fontWeight: "600",

        boxShadow:
            "0 8px 25px rgba(0,0,0,0.25)",

        zIndex: "999999",

        opacity: "1",

        visibility: "visible",

        display: "block",

        transition: "opacity 0.3s ease"

    });


    // Add notification to page
    document.body.appendChild(toast);


    // Automatically hide after 3 seconds
    toastTimer = setTimeout(() => {

        toast.style.opacity = "0";

        toastRemoveTimer = setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}


// Load products when page opens
loadProducts();
