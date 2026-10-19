
import { auth, db } from "../../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const featuredProducts = document.getElementById("featuredProducts");
const orderButtons = document.querySelectorAll("[data-order-button]");
const protectedLinks = document.querySelectorAll("[data-protected-link]");
const accountLink = document.getElementById("accountLink");

let signedIn = false;

// Update ordering links when Firebase confirms the login status.
onAuthStateChanged(auth, (user) => {
    signedIn = Boolean(user);

    const destination = signedIn ? "menu.html" : "login.html";

    orderButtons.forEach((button) => {
        button.href = destination;
    });

    protectedLinks.forEach((link) => {
        link.href = destination;
    });

    if (accountLink) {
        accountLink.textContent = signedIn ? "Profile" : "Login";
        accountLink.href = signedIn ? "profile.html" : "login.html";
    }
});

// Display a message in the product section.
function showMessage(message) {
    featuredProducts.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    paragraph.style.cssText =
        "color:#8c939c; grid-column:1/-1; padding:20px 0;";

    featuredProducts.appendChild(paragraph);
}

// Load actual active products from Firestore.
async function loadFeaturedProducts() {
    showMessage("Loading our delicious menu...");

    try {
        const productsQuery = query(
            collection(db, "products"),
            where("active", "==", true)
        );

        const snapshot = await getDocs(productsQuery);

        const products = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data()
        }));

        if (products.length === 0) {
            showMessage("Our menu is being prepared. Please check back soon.");
            return;
        }

        displayFeaturedProducts(products.slice(0, 4));
    } catch (error) {
        console.error("Could not load featured products:", error);

        showMessage(
            "We couldn't load our menu right now. Please try again later."
        );
    }
}

// Show up to four real products without adding another ordering button.
function displayFeaturedProducts(products) {
    featuredProducts.replaceChildren();

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "food-card";

        if (product.image) {
            const image = document.createElement("img");

            image.src = product.image;
            image.alt = product.name || "Krispy Box menu item";
            image.className = "food-image";
            image.loading = "lazy";

            image.onerror = () => {
                image.style.display = "none";
            };

            card.appendChild(image);
        }

        const content = document.createElement("div");
        content.className = "food-content";

        const name = document.createElement("h3");
        name.textContent = product.name || "Menu item";

        const description = document.createElement("p");
        description.textContent =
            product.description || "Discover this Krispy Box favourite.";

        const price = document.createElement("span");
        price.className = "price";

        const amount = Number(product.price);
        price.textContent = Number.isFinite(amount)
            ? `R${amount.toFixed(2)}`
            : "Price unavailable";

        content.append(name, description, price);
        card.appendChild(content);
        featuredProducts.appendChild(card);
    });
}

loadFeaturedProducts();
