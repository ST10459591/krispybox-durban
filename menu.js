
import { db } from "../../firebase.js";
import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const productsContainer = document.getElementById("productsContainer");

let products = [];

function showMessage(message) {
    productsContainer.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    paragraph.style.cssText =
        "color:#666;text-align:center;width:100%;";

    productsContainer.appendChild(paragraph);
}

// Load active products from Firestore.
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

// Display the products.
function displayProducts() {
    productsContainer.replaceChildren();

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "food-card";

        const image = document.createElement("img");
        image.src = product.image || "";
        image.alt = product.name || "Menu item";
        image.className = "food-image";

        image.onerror = () => {
            image.style.display = "none";
        };

        const content = document.createElement("div");
        content.className = "food-content";

        const name = document.createElement("h3");
        name.textContent = product.name || "Unnamed product";

        const description = document.createElement("p");
        description.textContent = product.description || "";

        const priceCart = document.createElement("div");
        priceCart.className = "price-cart";

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = `R${Number(product.price).toFixed(2)}`;

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

// Keep the cart in localStorage for now.
function addToCart(productId) {
    const product = products.find((item) => item.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }
    } catch {
        cart = [];
    }

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

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} has been added to your cart!`);
}

loadProducts();
