import { auth, db } from "../../firebase.js";

import {
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const profileForm = document.getElementById("profileForm");
const profileMessage = document.getElementById("profileMessage");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;
let currentRole = null;

function showMessage(message, color = "black") {
    if (!profileMessage) return;

    profileMessage.textContent = message;
    profileMessage.style.color = color;
    profileMessage.style.display = "block";
}

function setField(id, value) {
    const field = document.getElementById(id);
    if (field) field.value = value ?? "";
}

function setCheckbox(id, value) {
    const field = document.getElementById(id);
    if (field) field.checked = Boolean(value);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value ?? "";
}

// Check the signed-in Firebase account.
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            showMessage(
                "Your account profile could not be found. Please contact support.",
                "red"
            );
            return;
        }

        const data = snapshot.data();
        currentRole = data.role;

        // This page is for customers, not administrators.
        if (currentRole === "admin") {
            window.location.href = "admin/dashboard.html";
            return;
        }

        if (currentRole !== "customer") {
            await signOut(auth);
            window.location.href = "login.html";
            return;
        }

        setText("profileName", data.fullname || user.displayName || "Customer");
        setText("profileEmail", user.email || "");
        const emailDisplay = document.getElementById("emailDisplay");
        if (emailDisplay) emailDisplay.value = user.email || "";

        setField("fullNameInput", data.fullname || user.displayName || "");
        setField("phoneInput", data.phone);
        setField("addressInput", data.address);
        setField("suburbInput", data.suburb);
        setField("cityInput", data.city);
        setField("provinceInput", data.province);
        setField("postalCodeInput", data.postalCode);
        setField("preferredContact", data.preferredContact || "email");

        setCheckbox("emailNotifications", data.emailNotifications);
        setCheckbox("smsNotifications", data.smsNotifications);

    } catch (error) {
        console.error("Profile loading error:", error);
        showMessage(
            "Unable to load your profile. Please try again.",
            "red"
        );
    }
});

// Save personal details and account preferences.
profileForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentUser || currentRole !== "customer") {
        showMessage("Please sign in to save your profile.", "red");
        return;
    }

    const fullname =
        document.getElementById("fullNameInput")?.value.trim() || "";

    if (!fullname) {
        showMessage("Please enter your full name.", "red");
        return;
    }

    const saveButton = profileForm.querySelector(
        'button[type="submit"]'
    );

    if (saveButton) saveButton.disabled = true;

    showMessage("Saving your changes...");

    const profileData = {
        fullname,
        phone: document.getElementById("phoneInput")?.value.trim() || "",
        address: document.getElementById("addressInput")?.value.trim() || "",
        suburb: document.getElementById("suburbInput")?.value.trim() || "",
        city: document.getElementById("cityInput")?.value.trim() || "",
        province: document.getElementById("provinceInput")?.value.trim() || "",
        postalCode:
            document.getElementById("postalCodeInput")?.value.trim() || "",
        preferredContact:
            document.getElementById("preferredContact")?.value || "email",
        emailNotifications:
            document.getElementById("emailNotifications")?.checked || false,
        smsNotifications:
            document.getElementById("smsNotifications")?.checked || false
    };

    try {
        await setDoc(
            doc(db, "users", currentUser.uid),
            profileData,
            { merge: true }
        );

        await updateProfile(currentUser, {
            displayName: fullname
        });

        setText("profileName", fullname);

        showMessage("Your profile has been saved!", "green");

    } catch (error) {
        console.error("Profile save error:", error);

        showMessage(
            "Unable to save your changes. Please try again.",
            "red"
        );
    } finally {
        if (saveButton) saveButton.disabled = false;
    }
});

profileForm?.addEventListener("reset", () => {
    setTimeout(() => {
        if (!currentUser) return;

        getDoc(doc(db, "users", currentUser.uid))
            .then((snapshot) => {
                if (!snapshot.exists()) return;

                const data = snapshot.data();

                setField(
                    "fullNameInput",
                    data.fullname || currentUser.displayName || ""
                );
                setField("phoneInput", data.phone);
                setField("addressInput", data.address);
                setField("suburbInput", data.suburb);
                setField("cityInput", data.city);
                setField("provinceInput", data.province);
                setField("postalCodeInput", data.postalCode);
                setField(
                    "preferredContact",
                    data.preferredContact || "email"
                );

                setCheckbox("emailNotifications", data.emailNotifications);
                setCheckbox("smsNotifications", data.smsNotifications);
            })
            .catch((error) => {
                console.error("Could not restore saved profile:", error);
                showMessage("Could not restore your saved details.", "red");
            });
    }, 0);
});

// Send a password reset link to the customer's email.
resetPasswordBtn?.addEventListener("click", async () => {
    if (!currentUser?.email) {
        showMessage("No email address is associated with this account.", "red");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, currentUser.email);

        showMessage(
            "Password reset instructions have been sent to your email.",
            "green"
        );
    } catch (error) {
        console.error("Password reset error:", error);

        showMessage(
            "Unable to send the reset email. Please try again.",
            "red"
        );
    }
});

// Sign out of Firebase.
logoutBtn?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout error:", error);
        showMessage("Unable to sign out. Please try again.", "red");
    }
});