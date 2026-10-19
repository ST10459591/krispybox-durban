import { auth, db } from "../../firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const addProductForm = document.getElementById("addProductForm");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const successMessage = document.getElementById("successMessage");
const addProductButton = document.getElementById("addProductButton");

let currentAdmin = false;

// Show messages on the page.
function showMessage(message, isError = false) {
    successMessage.textContent = message;
    successMessage.style.display = "block";
    successMessage.style.color = isError ? "red" : "green";
}

// Check that the signed-in user is an administrator.
onAuthStateChanged(auth, async (user) => {
    currentAdmin = false;

    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists() || userDoc.data().role !== "admin") {
            alert("Access denied. Administrator access is required.");
            window.location.href = "../login.html";
            return;
        }

        currentAdmin = true;
    } catch (error) {
        console.error("Admin verification failed:", error);
        showMessage(
            "We couldn't verify your administrator access. Please try again.",
            true
        );
    }
});

// Preview the image using its path.

imageInput.addEventListener("input", () => {
    const imagePath = imageInput.value.trim();

    if (!imagePath) {
        imagePreview.style.display = "none";
        imagePreview.removeAttribute("src");
        return;
    }

    const imageUrl = imagePath.startsWith("assets/")
        ? "../" + imagePath
        : imagePath;

    imagePreview.onload = () => {
        imagePreview.style.display = "block";
    };

    imagePreview.onerror = () => {
        imagePreview.style.display = "none";
        showMessage("Image not found. Please check the image path.", true);
    };

    imagePreview.src = imageUrl;
});


// Save product details to Firestore.
addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentAdmin) {
        showMessage(
            "Please sign in with an administrator account before adding products.",
            true
        );
        return;
    }

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = Number(priceInput.value);
    const image = imageInput.value.trim();

    if (
        !name ||
        !description ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !image
    ) {
        showMessage("Please complete all fields with valid information.", true);
        return;
    }

    addProductButton.disabled = true;
    addProductButton.textContent = "Saving product...";

    try {
        await addDoc(collection(db, "products"), {
            name,
            description,
            price,
            image,
            active: true,
            createdAt: serverTimestamp(),
            createdBy: auth.currentUser.uid
        });

        showMessage("Product added successfully!");

        addProductForm.reset();
        imagePreview.removeAttribute("src");
        imagePreview.style.display = "none";
    } catch (error) {
        console.error("Error saving product:", error);

        if (error.code === "permission-denied") {
            showMessage(
                "Permission denied. Check your Firestore security rules and administrator role.",
                true
            );
        } else {
            showMessage(
                "The product could not be saved. Please try again.",
                true
            );
        }
    } finally {
        addProductButton.disabled = false;
        addProductButton.textContent = "Add Product →";
    }
});
