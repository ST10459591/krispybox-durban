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

const BACKEND_URL = "http://127.0.0.1:3000";

let currentAdmin = false;
let previewUrl = null;

function showMessage(message, isError = false) {
    successMessage.textContent = message;
    successMessage.style.display = "block";
    successMessage.style.color = isError ? "red" : "green";
}

// Check administrator access
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
            "We couldn't verify your administrator access.",
            true
        );
    }
});

// Preview selected image
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
    }

    if (!file) {
        imagePreview.removeAttribute("src");
        imagePreview.style.display = "none";
        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        showMessage("Please select a JPG, PNG or WebP image.", true);
        imageInput.value = "";
        imagePreview.style.display = "none";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showMessage("Please select an image smaller than 5MB.", true);
        imageInput.value = "";
        imagePreview.style.display = "none";
        return;
    }

    previewUrl = URL.createObjectURL(file);

    imagePreview.src = previewUrl;
    imagePreview.style.display = "block";
    successMessage.style.display = "none";
});

// Upload image to backend
async function uploadImage(file, user) {
    const formData = new FormData();
    formData.append("image", file);

    const token = await user.getIdToken();

    const response = await fetch(`${BACKEND_URL}/api/upload-image`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    const result = await response.json();

    if (!response.ok || !result.success || !result.imageUrl) {
        throw new Error(result.message || "Image upload failed.");
    }

    return result.imageUrl;
}

// Save product to Firestore
addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = auth.currentUser;

    if (!currentAdmin || !user) {
        showMessage(
            "Administrator access is required.",
            true
        );
        return;
    }

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = Number(priceInput.value);
    const file = imageInput.files[0];

    if (
        !name ||
        !description ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !file
    ) {
        showMessage(
            "Please complete all fields with valid information.",
            true
        );
        return;
    }

    addProductButton.disabled = true;

    try {
        addProductButton.textContent = "Uploading image...";

        const imageUrl = await uploadImage(file, user);

        addProductButton.textContent = "Saving product...";

        await addDoc(collection(db, "products"), {
            name,
            description,
            price,
            image: imageUrl,
            active: true,
            createdAt: serverTimestamp(),
            createdBy: user.uid
        });

        showMessage("Product added successfully!");

        addProductForm.reset();

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        imagePreview.removeAttribute("src");
        imagePreview.style.display = "none";

    } catch (error) {
        console.error("Error adding product:", error);

        showMessage(
            error.message || "The product could not be saved.",
            true
        );

    } finally {
        addProductButton.disabled = false;
        addProductButton.textContent = "Add Product →";
    }
});